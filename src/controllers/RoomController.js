const Database = require('../db/config');

module.exports = {
    async create(req, res){
        const db = await Database();
        const pass = req.body.password;
        let roomId;
        let isRoom = true;

        while(isRoom){
            // calculo para criar o id da sala randomicamente
            for(var i = 0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            };

            // Verificar se esse número já existe
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

            if(!isRoom){
                // Inseri a sala no banco
                await db.run(`
                INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`);
            }
        }    

        await db.close();

        res.redirect(`/room/${roomId}`);
    },
    // pegando o id para colocar dinamicamente no front
    async open(req, res){
        const db = await Database();
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`);
        let inNoQuestions

        if(questions.length == 0){
            if(questionsRead.length == 0){
                inNoQuestions = true;
            };
        };

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, inNoQuestions: inNoQuestions});
    },

    enter(req, res){
        const roomId = req.body.roomId;

        res.redirect(`/room/${roomId}`);
    }
};