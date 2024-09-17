import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
});
const roundOfHashing = Number(process.env.ROUND_OF_HASHING);

const main = async () => {
  const user0 = await prisma.users.upsert({
    where: { email: 'user0@example.com' },
    update: {},
    create: {
      name: 'user0',
      password: await bcrypt.hash('user!:;Password', 10),
      email: 'user0@example.com',
    },
  });

  const admin0 = await prisma.users.upsert({
    where: { email: 'admin0@example.com' },
    update: {},
    create: {
      name: 'admin0',
      password: await bcrypt.hash('admin!:;Password', 10),
      email: 'admin0@example.com',
      roles: ['ADMIN'],
    },
  });
  const movie1 = await prisma.movies.upsert({
    where: { id: 'b423dde4-a25d-471f-8c51-62106acaa230' },
    update: {},
    create: {
      id: 'b423dde4-a25d-471f-8c51-62106acaa230',
      name: 'Forrest Gump',
      description:
        'The history of the United States from the 1950s to the `70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.',
      posterUrl: `https://sun9-25.userapi.com/impg/TzjfyQAZeKYK3XEAn7cnCb3BDjdehgZfn5Slhw/LBxP2KAl44c.jpg?size=1280x720&quality=96&sign=03f012bf61871d35636517864beac644&c_uniq_tag=gBhmy7FubS_Y2fbypbZsof1jhAmHOaku-Gh6O-bD3Ao&type=album`,
    },
  });
  const movie2 = await prisma.movies.upsert({
    where: { id: '02ad667e-5da0-4a64-a6ed-5d76fa15ffe8' },
    update: {},
    create: {
      id: '02ad667e-5da0-4a64-a6ed-5d76fa15ffe8',
      name: 'Perfume: The Story of a Murderer',
      description: `Jean-Baptiste Grenouille, born with a superior olfactory sense, creates the world's finest perfume. His work, however, takes a dark turn as he searches for the ultimate scent.`,
      posterUrl: `https://avatars.mds.yandex.net/i?id=ed0c12c77f15b36a004196f6dbeab83f_l-5087064-images-thumbs&n=13`,
    },
  });
  const movie3 = await prisma.movies.upsert({
    where: { id: '6e94b7f4-513f-40f2-b281-2238c0b2fbb1' },
    update: {},
    create: {
      id: '6e94b7f4-513f-40f2-b281-2238c0b2fbb1',
      name: 'The Godfather',
      description:
        'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      posterUrl:
        'https://i.pinimg.com/originals/24/8f/e5/248fe5947fed429d64385ad059a673d1.jpg',
    },
  });
  const movie4 = await prisma.movies.upsert({
    where: { id: '73f32d78-2716-4d8e-82d5-dd7ec02ae17a' },
    update: {},
    create: {
      id: '73f32d78-2716-4d8e-82d5-dd7ec02ae17a',
      name: 'The Green Mile',
      description: `A tale set on death row, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the lead guard, Paul Edgecombe, recognizes John's gift, he tries to help stave off the condemned man's execution.`,
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BNDViZWNlZjAtNGM1Zi00M2NjLThlMGUtZjVjZTU3MWM5YzFmL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjg4NzYzMzA@._V1_.jpg',
    },
  });
  const movie5 = await prisma.movies.upsert({
    where: { id: '68d0eeb0-dd21-4b51-ad14-8d37d471eb6f' },
    update: {},
    create: {
      id: '68d0eeb0-dd21-4b51-ad14-8d37d471eb6f',
      name: `Schindler's List`,
      description: `In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.`,
      posterUrl:
        'https://is1-ssl.mzstatic.com/image/thumb/xHiudkp70BJscdyq6V8uow/1200x675.jpg',
    },
  });
  console.log(user0, admin0, movie1, movie2, movie3, movie4, movie5);
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
