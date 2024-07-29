import express from 'express';
import next from 'next';
import questionRoutes from "./src/routes/questionRoutes";
import bodypartRoutes from "./src/routes/bodypartRoutes";
import backBodypartRoutes from "./src/routes/backBodypartRouts";
import answerRoutes from "./src/routes/answerRoutes";

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        server.use(express.json());

        // Your express routes here
        server.use('/api/questions', questionRoutes);
        server.use('/api/bodyparts', bodypartRoutes);
        server.use('/api/backBodyParts', backBodypartRoutes);
        server.use('/api/answers', answerRoutes);

        // Default catch-all handler to allow Next.js to handle all other routes
        server.all('*', (req, res) => {
            return handle(req, res);
        });

        // @ts-ignore
        server.listen(3001, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3001');
        });
    })
    .catch((err) => {
        console.log('Error:::::', err);
    });