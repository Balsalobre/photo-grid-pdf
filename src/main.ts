import { createServer } from './server.ts';

const PORT = Number(process.env.PORT) || 3000;
const app = createServer();
app.listen(PORT, () => {
	console.log(`Photo grid PDF service listening on :${PORT}`);
});

export {};
