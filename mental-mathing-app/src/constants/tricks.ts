import { MentalMathTrick, Problem, Solution } from '../types';

// Helper function to generate random integer between min and max (inclusive)
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const mentalMathTricks: MentalMathTrick[] = [
  {
    id: '1-percent-anchor',
    name: 'The 1% Anchor',
    difficulty: 'Easy',
    shortDescription: 'Find 1% first, then scale up or down',
    explanation: 'To calculate any percentage, first find 1% by dividing by 100, then multiply to get your target percentage. This makes complex percentages much easier!',
    formula: 'n% of x = (x ÷ 100) × n',
    examples: [
      {
        problem: 'What is 15% of 80?',
        steps: [
          '1% of 80 = 80 ÷ 100 = 0.8',
          '15% = 1% × 15',
          '0.8 × 15 = 12',
        ],
        answer: '12',
      },
      {
        problem: 'What is 23% of 200?',
        steps: [
          '1% of 200 = 200 ÷ 100 = 2',
          '23% = 1% × 23',
          '2 × 23 = 46',
        ],
        answer: '46',
      },
      {
        problem: 'What is 7% of 150?',
        steps: [
          '1% of 150 = 150 ÷ 100 = 1.5',
          '7% = 1% × 7',
          '1.5 × 7 = 10.5',
        ],
        answer: '10.5',
      },
    ],
    generateProblem: () => {
      const base = randomInt(5, 20) * 10; // 50-200
      const percent = randomInt(2, 30);
      const answer = (base / 100) * percent;
      return {
        id: Math.random().toString(),
        trickId: '1-percent-anchor',
        question: `What is ${percent}% of ${base}?`,
        correctAnswer: answer,
        data: { base, percent },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      const numAnswer = parseFloat(userAnswer);
      return Math.abs(numAnswer - problem.correctAnswer) < 0.01;
    },
    getSolution: (problem) => {
      const { base, percent } = problem.data;
      const onePercent = base / 100;
      return {
        steps: [
          `1% of ${base} = ${base} ÷ 100 = ${onePercent}`,
          `${percent}% = 1% × ${percent}`,
          `${onePercent} × ${percent} = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'flip-trick',
    name: 'The Flip Trick',
    difficulty: 'Easy',
    shortDescription: 'a% of b = b% of a',
    explanation: 'This beautiful symmetry makes some percentages trivial! 4% of 75 is hard, but 75% of 4 is easy (just 3). They\'re the same!',
    formula: 'a% of b = b% of a',
    examples: [
      {
        problem: 'What is 4% of 75?',
        steps: [
          'Flip it: 75% of 4',
          '75% of 4 = 0.75 × 4',
          '= 3',
        ],
        answer: '3',
      },
      {
        problem: 'What is 8% of 50?',
        steps: [
          'Flip it: 50% of 8',
          '50% of 8 = 0.5 × 8',
          '= 4',
        ],
        answer: '4',
      },
      {
        problem: 'What is 16% of 25?',
        steps: [
          'Flip it: 25% of 16',
          '25% of 16 = 16 ÷ 4',
          '= 4',
        ],
        answer: '4',
      },
    ],
    generateProblem: () => {
      const pairs = [[4, 75], [8, 50], [16, 25], [2, 50], [4, 50], [12, 25], [20, 5], [16, 50]];
      const [a, b] = pairs[randomInt(0, pairs.length - 1)];
      const answer = (a / 100) * b;
      return {
        id: Math.random().toString(),
        trickId: 'flip-trick',
        question: `What is ${a}% of ${b}?`,
        correctAnswer: answer,
        data: { a, b },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      const numAnswer = parseFloat(userAnswer);
      return Math.abs(numAnswer - problem.correctAnswer) < 0.01;
    },
    getSolution: (problem) => {
      const { a, b } = problem.data;
      return {
        steps: [
          `Flip it: ${b}% of ${a}`,
          `${b}% of ${a} = ${b / 100} × ${a}`,
          `= ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'quick-times-5',
    name: 'Quick × 5',
    difficulty: 'Easy',
    shortDescription: 'Multiply by 10, then divide by 2',
    explanation: 'Instead of multiplying by 5 directly, multiply by 10 (easy!) and then divide by 2.',
    formula: 'n × 5 = (n × 10) ÷ 2',
    examples: [
      {
        problem: '68 × 5 = ?',
        steps: [
          '68 × 10 = 680',
          '680 ÷ 2 = 340',
        ],
        answer: '340',
      },
      {
        problem: '124 × 5 = ?',
        steps: [
          '124 × 10 = 1240',
          '1240 ÷ 2 = 620',
        ],
        answer: '620',
      },
      {
        problem: '86 × 5 = ?',
        steps: [
          '86 × 10 = 860',
          '860 ÷ 2 = 430',
        ],
        answer: '430',
      },
    ],
    generateProblem: () => {
      const n = randomInt(20, 200);
      const answer = n * 5;
      return {
        id: Math.random().toString(),
        trickId: 'quick-times-5',
        question: `${n} × 5 = ?`,
        correctAnswer: answer,
        data: { n },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseInt(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { n } = problem.data;
      const timesTen = n * 10;
      return {
        steps: [
          `${n} × 10 = ${timesTen}`,
          `${timesTen} ÷ 2 = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'square-ends-5',
    name: 'Squaring Numbers Ending in 5',
    difficulty: 'Medium',
    shortDescription: 'n5² = n(n+1), then add 25',
    explanation: 'For any two-digit number ending in 5, multiply the first digit by itself plus 1, then append 25. For 65²: 6×7=42, append 25 → 4225!',
    formula: '(10n + 5)² = n(n + 1) × 100 + 25',
    examples: [
      {
        problem: '35² = ?',
        steps: [
          'n = 3',
          '3 × (3 + 1) = 3 × 4 = 12',
          'Append 25: 1225',
        ],
        answer: '1225',
      },
      {
        problem: '85² = ?',
        steps: [
          'n = 8',
          '8 × (8 + 1) = 8 × 9 = 72',
          'Append 25: 7225',
        ],
        answer: '7225',
      },
      {
        problem: '65² = ?',
        steps: [
          'n = 6',
          '6 × (6 + 1) = 6 × 7 = 42',
          'Append 25: 4225',
        ],
        answer: '4225',
      },
    ],
    generateProblem: () => {
      const n = randomInt(2, 9);
      const number = n * 10 + 5;
      const answer = number * number;
      return {
        id: Math.random().toString(),
        trickId: 'square-ends-5',
        question: `${number}² = ?`,
        correctAnswer: answer,
        data: { n, number },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseInt(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { n, number } = problem.data;
      const product = n * (n + 1);
      return {
        steps: [
          `n = ${n}`,
          `${n} × (${n} + 1) = ${n} × ${n + 1} = ${product}`,
          `Append 25: ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: '25-percent-shortcut',
    name: '25% Shortcut',
    difficulty: 'Easy',
    shortDescription: 'Divide by 4',
    explanation: '25% is the same as 1/4, so just divide by 4!',
    formula: '25% of n = n ÷ 4',
    examples: [
      {
        problem: '25% of 84 = ?',
        steps: [
          '84 ÷ 4 = 21',
        ],
        answer: '21',
      },
      {
        problem: '25% of 160 = ?',
        steps: [
          '160 ÷ 4 = 40',
        ],
        answer: '40',
      },
      {
        problem: '25% of 92 = ?',
        steps: [
          '92 ÷ 4 = 23',
        ],
        answer: '23',
      },
    ],
    generateProblem: () => {
      const n = randomInt(10, 50) * 4; // Ensure divisible by 4
      const answer = n / 4;
      return {
        id: Math.random().toString(),
        trickId: '25-percent-shortcut',
        question: `25% of ${n} = ?`,
        correctAnswer: answer,
        data: { n },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseFloat(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { n } = problem.data;
      return {
        steps: [
          `${n} ÷ 4 = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: '11-multiplication',
    name: '11 Multiplication',
    difficulty: 'Easy',
    shortDescription: 'Split digits, add sum in middle',
    explanation: 'For two-digit numbers times 11: split the digits, add them, put the sum in the middle. If sum > 9, carry the 1.',
    formula: 'ab × 11 = a(a+b)b',
    examples: [
      {
        problem: '43 × 11 = ?',
        steps: [
          'Split: 4 and 3',
          'Add: 4 + 3 = 7',
          'Put in middle: 4-7-3 = 473',
        ],
        answer: '473',
      },
      {
        problem: '27 × 11 = ?',
        steps: [
          'Split: 2 and 7',
          'Add: 2 + 7 = 9',
          'Put in middle: 2-9-7 = 297',
        ],
        answer: '297',
      },
      {
        problem: '56 × 11 = ?',
        steps: [
          'Split: 5 and 6',
          'Add: 5 + 6 = 11 (carry the 1)',
          'Put in middle: (5+1)-1-6 = 616',
        ],
        answer: '616',
      },
    ],
    generateProblem: () => {
      const a = randomInt(1, 8);
      const b = randomInt(1, 9);
      const number = a * 10 + b;
      const answer = number * 11;
      return {
        id: Math.random().toString(),
        trickId: '11-multiplication',
        question: `${number} × 11 = ?`,
        correctAnswer: answer,
        data: { a, b, number },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseInt(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { a, b } = problem.data;
      const sum = a + b;
      if (sum >= 10) {
        return {
          steps: [
            `Split: ${a} and ${b}`,
            `Add: ${a} + ${b} = ${sum} (carry the 1)`,
            `Put in middle: (${a}+1)-${sum % 10}-${b} = ${problem.correctAnswer}`,
          ],
          answer: problem.correctAnswer.toString(),
        };
      }
      return {
        steps: [
          `Split: ${a} and ${b}`,
          `Add: ${a} + ${b} = ${sum}`,
          `Put in middle: ${a}-${sum}-${b} = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'numbers-near-100',
    name: 'Numbers Near 100',
    difficulty: 'Medium',
    shortDescription: 'Cross-subtract for numbers close to 100',
    explanation: 'To multiply numbers near 100, use the cross-subtract method. Subtract each from 100, cross-subtract for the first part, multiply the differences for the last part.',
    formula: '(100-a) × (100-b) = (100-a-b) × 100 + (a × b)',
    examples: [
      {
        problem: '97 × 96 = ?',
        steps: [
          '100 - 97 = 3, 100 - 96 = 4',
          'Cross-subtract: 97 - 4 = 93 (or 96 - 3 = 93)',
          'Multiply differences: 3 × 4 = 12',
          'Combine: 9312',
        ],
        answer: '9312',
      },
      {
        problem: '98 × 95 = ?',
        steps: [
          '100 - 98 = 2, 100 - 95 = 5',
          'Cross-subtract: 98 - 5 = 93 (or 95 - 2 = 93)',
          'Multiply differences: 2 × 5 = 10',
          'Combine: 9310',
        ],
        answer: '9310',
      },
    ],
    generateProblem: () => {
      const a = randomInt(1, 9);
      const b = randomInt(1, 9);
      const num1 = 100 - a;
      const num2 = 100 - b;
      const answer = num1 * num2;
      return {
        id: Math.random().toString(),
        trickId: 'numbers-near-100',
        question: `${num1} × ${num2} = ?`,
        correctAnswer: answer,
        data: { num1, num2, a, b },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseInt(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { num1, num2, a, b } = problem.data;
      const crossSubtract = num1 - b;
      const product = a * b;
      return {
        steps: [
          `100 - ${num1} = ${a}, 100 - ${num2} = ${b}`,
          `Cross-subtract: ${num1} - ${b} = ${crossSubtract}`,
          `Multiply differences: ${a} × ${b} = ${product}`,
          `Combine: ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'difference-of-squares',
    name: 'Difference of Squares',
    difficulty: 'Medium',
    shortDescription: 'a² - b² = (a+b)(a-b)',
    explanation: 'When you need to subtract squares, use this identity to simplify the calculation.',
    formula: 'a² - b² = (a + b)(a - b)',
    examples: [
      {
        problem: '25² - 20² = ?',
        steps: [
          'a = 25, b = 20',
          'a + b = 45, a - b = 5',
          '45 × 5 = 225',
        ],
        answer: '225',
      },
      {
        problem: '30² - 25² = ?',
        steps: [
          'a = 30, b = 25',
          'a + b = 55, a - b = 5',
          '55 × 5 = 275',
        ],
        answer: '275',
      },
    ],
    generateProblem: () => {
      const b = randomInt(10, 30);
      const diff = randomInt(2, 10);
      const a = b + diff;
      const answer = a * a - b * b;
      return {
        id: Math.random().toString(),
        trickId: 'difference-of-squares',
        question: `${a}² - ${b}² = ?`,
        correctAnswer: answer,
        data: { a, b },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseInt(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { a, b } = problem.data;
      const sum = a + b;
      const diff = a - b;
      return {
        steps: [
          `a = ${a}, b = ${b}`,
          `a + b = ${sum}, a - b = ${diff}`,
          `${sum} × ${diff} = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'divide-by-5',
    name: 'Divide by 5',
    difficulty: 'Easy',
    shortDescription: 'Double it, then divide by 10',
    explanation: 'Dividing by 5 is the same as multiplying by 2 and dividing by 10.',
    formula: 'n ÷ 5 = (n × 2) ÷ 10',
    examples: [
      {
        problem: '85 ÷ 5 = ?',
        steps: [
          '85 × 2 = 170',
          '170 ÷ 10 = 17',
        ],
        answer: '17',
      },
      {
        problem: '145 ÷ 5 = ?',
        steps: [
          '145 × 2 = 290',
          '290 ÷ 10 = 29',
        ],
        answer: '29',
      },
    ],
    generateProblem: () => {
      const n = randomInt(10, 50) * 5; // Ensure divisible by 5
      const answer = n / 5;
      return {
        id: Math.random().toString(),
        trickId: 'divide-by-5',
        question: `${n} ÷ 5 = ?`,
        correctAnswer: answer,
        data: { n },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseFloat(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { n } = problem.data;
      const doubled = n * 2;
      return {
        steps: [
          `${n} × 2 = ${doubled}`,
          `${doubled} ÷ 10 = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'complement-subtraction',
    name: 'Complement Subtraction',
    difficulty: 'Hard',
    shortDescription: 'Subtract from powers of 10 using complements',
    explanation: 'To subtract from 1000, 10000, etc., subtract each digit from 9, except the last digit from 10.',
    formula: '1000 - abc = (9-a)(9-b)(10-c)',
    examples: [
      {
        problem: '1000 - 567 = ?',
        steps: [
          '9 - 5 = 4',
          '9 - 6 = 3',
          '10 - 7 = 3',
          'Answer: 433',
        ],
        answer: '433',
      },
      {
        problem: '1000 - 234 = ?',
        steps: [
          '9 - 2 = 7',
          '9 - 3 = 6',
          '10 - 4 = 6',
          'Answer: 766',
        ],
        answer: '766',
      },
    ],
    generateProblem: () => {
      const n = randomInt(100, 900);
      const answer = 1000 - n;
      return {
        id: Math.random().toString(),
        trickId: 'complement-subtraction',
        question: `1000 - ${n} = ?`,
        correctAnswer: answer,
        data: { n },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseInt(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { n } = problem.data;
      const digits = n.toString().split('').map(Number);
      const steps = [];
      for (let i = 0; i < digits.length - 1; i++) {
        steps.push(`9 - ${digits[i]} = ${9 - digits[i]}`);
      }
      steps.push(`10 - ${digits[digits.length - 1]} = ${10 - digits[digits.length - 1]}`);
      steps.push(`Answer: ${problem.correctAnswer}`);
      return { steps, answer: problem.correctAnswer.toString() };
    },
  },
  {
    id: 'multiply-by-9',
    name: 'Multiply by 9',
    difficulty: 'Easy',
    shortDescription: 'Multiply by 10, subtract original',
    explanation: 'Instead of multiplying by 9, multiply by 10 and subtract the original number.',
    formula: 'n × 9 = (n × 10) - n',
    examples: [
      {
        problem: '76 × 9 = ?',
        steps: [
          '76 × 10 = 760',
          '760 - 76 = 684',
        ],
        answer: '684',
      },
      {
        problem: '123 × 9 = ?',
        steps: [
          '123 × 10 = 1230',
          '1230 - 123 = 1107',
        ],
        answer: '1107',
      },
    ],
    generateProblem: () => {
      const n = randomInt(20, 150);
      const answer = n * 9;
      return {
        id: Math.random().toString(),
        trickId: 'multiply-by-9',
        question: `${n} × 9 = ?`,
        correctAnswer: answer,
        data: { n },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseInt(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { n } = problem.data;
      const timesTen = n * 10;
      return {
        steps: [
          `${n} × 10 = ${timesTen}`,
          `${timesTen} - ${n} = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'percentage-plus-minus-10',
    name: 'Percentage ±10%',
    difficulty: 'Medium',
    shortDescription: 'Add/subtract 10% by multiplying by 1.1 or 0.9',
    explanation: 'To add 10%, multiply by 1.1. To subtract 10%, multiply by 0.9.',
    formula: 'n + 10% = n × 1.1, n - 10% = n × 0.9',
    examples: [
      {
        problem: '80 + 10% = ?',
        steps: [
          '80 × 1.1 = 88',
        ],
        answer: '88',
      },
      {
        problem: '120 - 10% = ?',
        steps: [
          '120 × 0.9 = 108',
        ],
        answer: '108',
      },
    ],
    generateProblem: () => {
      const n = randomInt(10, 50) * 10;
      const isAdd = Math.random() > 0.5;
      const answer = isAdd ? n * 1.1 : n * 0.9;
      const operation = isAdd ? '+' : '-';
      return {
        id: Math.random().toString(),
        trickId: 'percentage-plus-minus-10',
        question: `${n} ${operation} 10% = ?`,
        correctAnswer: answer,
        data: { n, isAdd },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      const numAnswer = parseFloat(userAnswer);
      return Math.abs(numAnswer - problem.correctAnswer) < 0.01;
    },
    getSolution: (problem) => {
      const { n, isAdd } = problem.data;
      const multiplier = isAdd ? 1.1 : 0.9;
      return {
        steps: [
          `${n} × ${multiplier} = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'cube-ends-5',
    name: 'Cube Numbers Ending in 5',
    difficulty: 'Hard',
    shortDescription: 'n5³ = 125 × (2n+1)³',
    explanation: 'For two-digit numbers ending in 5, double the tens digit, add 1, cube that result, then multiply by 125. For 25: (2×2+1)³ × 125 = 5³ × 125 = 15625!',
    formula: '(10n + 5)³ = 125 × (2n + 1)³',
    examples: [
      {
        problem: '25³ = ?',
        steps: [
          'n = 2 (tens digit)',
          '2n + 1 = 2(2) + 1 = 5',
          '5³ = 125',
          '125 × 125 = 15625',
        ],
        answer: '15625',
      },
      {
        problem: '35³ = ?',
        steps: [
          'n = 3 (tens digit)',
          '2n + 1 = 2(3) + 1 = 7',
          '7³ = 343',
          '125 × 343 = 42875',
        ],
        answer: '42875',
      },
    ],
    generateProblem: () => {
      const n = randomInt(2, 5);
      const number = n * 10 + 5;
      const answer = number * number * number;
      return {
        id: Math.random().toString(),
        trickId: 'cube-ends-5',
        question: `${number}³ = ?`,
        correctAnswer: answer,
        data: { n, number },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseInt(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { n } = problem.data;
      const doubled = 2 * n + 1;
      const cubed = doubled * doubled * doubled;
      return {
        steps: [
          `n = ${n} (tens digit)`,
          `2n + 1 = 2(${n}) + 1 = ${doubled}`,
          `${doubled}³ = ${cubed}`,
          `125 × ${cubed} = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
  {
    id: 'multiply-by-99',
    name: 'Multiply by 99',
    difficulty: 'Medium',
    shortDescription: 'Multiply by 100, subtract number',
    explanation: 'Instead of multiplying by 99, multiply by 100 and subtract the original number.',
    formula: 'n × 99 = (n × 100) - n',
    examples: [
      {
        problem: '47 × 99 = ?',
        steps: [
          '47 × 100 = 4700',
          '4700 - 47 = 4653',
        ],
        answer: '4653',
      },
      {
        problem: '83 × 99 = ?',
        steps: [
          '83 × 100 = 8300',
          '8300 - 83 = 8217',
        ],
        answer: '8217',
      },
    ],
    generateProblem: () => {
      const n = randomInt(20, 99);
      const answer = n * 99;
      return {
        id: Math.random().toString(),
        trickId: 'multiply-by-99',
        question: `${n} × 99 = ?`,
        correctAnswer: answer,
        data: { n },
      };
    },
    validateAnswer: (problem, userAnswer) => {
      return parseInt(userAnswer) === problem.correctAnswer;
    },
    getSolution: (problem) => {
      const { n } = problem.data;
      const times100 = n * 100;
      return {
        steps: [
          `${n} × 100 = ${times100}`,
          `${times100} - ${n} = ${problem.correctAnswer}`,
        ],
        answer: problem.correctAnswer.toString(),
      };
    },
  },
];

// Create a map for easy lookup
export const tricksMap = mentalMathTricks.reduce((acc, trick) => {
  acc[trick.id] = trick;
  return acc;
}, {} as Record<string, MentalMathTrick>);
