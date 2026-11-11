const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial mathematics subjects and topics...');

  const algebra = await prisma.subject.upsert({
    where: { slug: 'algebra' },
    update: {},
    create: {
      title: 'Algebra',
      slug: 'algebra',
      description: 'Foundations of algebra, polynomials, equations, and systems.',
      icon: 'SquareRoot',
      topics: {
        create: [
          {
            title: 'Linear Equations & Inequalities',
            slug: 'linear-equations',
            difficulty: 'BEGINNER',
            orderIndex: 1,
            description: 'Solving single-variable and multi-variable linear equations.',
          },
          {
            title: 'Quadratic Functions',
            slug: 'quadratic-functions',
            difficulty: 'INTERMEDIATE',
            orderIndex: 2,
            description: 'Factoring, completing the square, and quadratic formulas.',
          },
          {
            title: 'Polynomial Operations',
            slug: 'polynomial-operations',
            difficulty: 'ADVANCED',
            orderIndex: 3,
            description: 'Dividing polynomials, root theorems, and complex roots.',
          },
        ],
      },
    },
  });

  const calculus = await prisma.subject.upsert({
    where: { slug: 'calculus' },
    update: {},
    create: {
      title: 'Calculus',
      slug: 'calculus',
      description: 'Limits, differential calculus, and integral calculus.',
      icon: 'Activity',
      topics: {
        create: [
          {
            title: 'Limits & Continuity',
            slug: 'limits-continuity',
            difficulty: 'BEGINNER',
            orderIndex: 1,
            description: 'Understanding intuitive and formal definitions of limits.',
          },
          {
            title: 'Derivatives & Rates of Change',
            slug: 'derivatives',
            difficulty: 'INTERMEDIATE',
            orderIndex: 2,
            description: 'Power rule, product/quotient rule, and chain rule.',
          },
          {
            title: 'Definite & Indefinite Integrals',
            slug: 'integrals',
            difficulty: 'ADVANCED',
            orderIndex: 3,
            description: 'Fundamental theorem of calculus and integration methods.',
          },
        ],
      },
    },
  });

  console.log('Database seeded successfully with initial math subjects:', [
    algebra.title,
    calculus.title,
  ]);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
