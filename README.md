This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## To run our project you use
npm run devStart
and it will run on localhost:3001.
What url you use to access the different pages is determined by the name of the directories in pages.

Prisma:

Oppdatere databasen:
npx prisma migrate dev --name <name>

Slette all data i DB:
npx prisma db push --force-reset

Legge til spørsmål fra question.json:
npm run addQuestions

Starte server på port 3000:
npm run devStart
Åpne swagger med: 
http://localhost:3000/api-docs/#/
Åpne siden med: 
localhost3001/questionpage/page

Åpne prisma studio:
npx prisma studio

Legge til bodyparts:
npm run addBodypart


To setup the database with some data inside of it:


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
