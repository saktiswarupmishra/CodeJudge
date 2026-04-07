import { SeedProblem } from './types';

export const sqlProblems: SeedProblem[] = [
  {
    title: 'Employee Salary Report',
    description: `You are given employee data as rows of: \`name salary department\`.

Write a program that reads the data and outputs the **total salary for each department**, sorted alphabetically by department name.

**Input Format:**
- First line: integer \`n\` — number of employees
- Next \`n\` lines: \`name salary department\` (space-separated)

**Output Format:**
- One line per department: \`department total_salary\`
- Sorted alphabetically by department

**Example:**
\`\`\`
Input:
5
Alice 50000 Engineering
Bob 60000 Marketing
Carol 55000 Engineering
Dave 45000 Marketing
Eve 70000 Engineering

Output:
Engineering 175000
Marketing 105000
\`\`\``,
    difficulty: 'EASY',
    tags: ['SQL', 'Database', 'Hash Table', 'Sorting'],
    constraints: `- 1 <= n <= 10^4\\n- 1 <= salary <= 10^7\\n- Department names contain only letters`,
    testCases: [
      { input: '5\nAlice 50000 Engineering\nBob 60000 Marketing\nCarol 55000 Engineering\nDave 45000 Marketing\nEve 70000 Engineering', output: 'Engineering 175000\nMarketing 105000', isHidden: false },
      { input: '3\nJohn 40000 Sales\nJane 50000 Sales\nJim 45000 Sales', output: 'Sales 135000', isHidden: false },
      { input: '4\nA 10000 Z\nB 20000 A\nC 30000 Z\nD 40000 A', output: 'A 60000\nZ 40000', isHidden: true },
      { input: '1\nSolo 99999 Solo', output: 'Solo 99999', isHidden: true },
    ],
  },
  {
    title: 'Second Highest Salary',
    description: `Given a list of employee salaries, find the **second highest distinct salary**. If there is no second highest salary, output \`NULL\`.

This simulates the classic SQL problem: \`SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee)\`.

**Input Format:**
- First line: integer \`n\` — number of salaries
- Second line: \`n\` space-separated integers (salaries)

**Output Format:**
- The second highest distinct salary, or \`NULL\` if it doesn't exist

**Example 1:**
\`\`\`
Input:
5
100 200 300 200 300

Output:
200
\`\`\`

**Example 2:**
\`\`\`
Input:
3
100 100 100

Output:
NULL
\`\`\``,
    difficulty: 'EASY',
    tags: ['SQL', 'Database', 'Sorting'],
    constraints: `- 1 <= n <= 10^5\\n- 1 <= salary[i] <= 10^9`,
    testCases: [
      { input: '5\n100 200 300 200 300', output: '200', isHidden: false },
      { input: '3\n100 100 100', output: 'NULL', isHidden: false },
      { input: '1\n50000', output: 'NULL', isHidden: true },
      { input: '4\n1 2 3 4', output: '3', isHidden: true },
    ],
  },
  {
    title: 'Department Top Earner',
    description: `Given employee data, find the **highest-paid employee in each department**. If there are ties, output all tied employees for that department (sorted by name).

This simulates: \`SELECT * FROM Employee e WHERE salary = (SELECT MAX(salary) FROM Employee WHERE department = e.department)\`.

**Input Format:**
- First line: integer \`n\`
- Next \`n\` lines: \`name salary department\`

**Output Format:**
- Lines of \`department name salary\`, sorted by department, then by name

**Example:**
\`\`\`
Input:
5
Alice 90000 Engineering
Bob 85000 Engineering
Carol 90000 Engineering
Dave 70000 Sales
Eve 75000 Sales

Output:
Engineering Alice 90000
Engineering Carol 90000
Sales Eve 75000
\`\`\``,
    difficulty: 'MEDIUM',
    tags: ['SQL', 'Database', 'Hash Table', 'Sorting'],
    constraints: `- 1 <= n <= 10^4\\n- 1 <= salary <= 10^9\\n- Names and departments contain only letters`,
    testCases: [
      { input: '5\nAlice 90000 Engineering\nBob 85000 Engineering\nCarol 90000 Engineering\nDave 70000 Sales\nEve 75000 Sales', output: 'Engineering Alice 90000\nEngineering Carol 90000\nSales Eve 75000', isHidden: false },
      { input: '3\nA 100 X\nB 100 X\nC 100 X', output: 'X A 100\nX B 100\nX C 100', isHidden: false },
      { input: '2\nAlpha 50000 HR\nBeta 60000 Finance', output: 'Finance Beta 60000\nHR Alpha 50000', isHidden: true },
      { input: '4\nJohn 80000 Engineering\nJane 80000 Engineering\nJim 90000 Sales\nJill 70000 Sales', output: 'Engineering Jane 80000\nEngineering John 80000\nSales Jim 90000', isHidden: true },
    ],
  },
  {
    title: 'Consecutive Login Days',
    description: `Given user login records, find users who have logged in for **at least 3 consecutive days**.

This simulates a classic SQL window function problem for detecting streaks.

**Input Format:**
- First line: integer \`n\` — number of login records
- Next \`n\` lines: \`user_id date\` (date in YYYY-MM-DD format)

**Output Format:**
- Distinct user IDs who have at least 3 consecutive login days, sorted in ascending order
- One user ID per line. If none, output \`NONE\`

**Example:**
\`\`\`
Input:
8
1 2024-01-01
1 2024-01-02
1 2024-01-03
2 2024-01-01
2 2024-01-02
2 2024-01-05
3 2024-01-10
3 2024-01-11

Output:
1
\`\`\``,
    difficulty: 'HARD',
    tags: ['SQL', 'Database', 'Window Functions', 'Sorting'],
    constraints: `- 1 <= n <= 10^5\\n- 1 <= user_id <= 10^5\\n- Dates are valid and in YYYY-MM-DD format\\n- No duplicate (user_id, date) pairs`,
    testCases: [
      { input: '8\n1 2024-01-01\n1 2024-01-02\n1 2024-01-03\n2 2024-01-01\n2 2024-01-02\n2 2024-01-05\n3 2024-01-10\n3 2024-01-11', output: '1', isHidden: false },
      { input: '6\n1 2024-01-01\n1 2024-01-02\n2 2024-01-01\n2 2024-01-02\n3 2024-01-01\n3 2024-01-02', output: 'NONE', isHidden: false },
      { input: '9\n1 2024-03-01\n1 2024-03-02\n1 2024-03-03\n2 2024-03-05\n2 2024-03-06\n2 2024-03-07\n2 2024-03-08\n3 2024-03-01\n3 2024-03-03', output: '1\n2', isHidden: true },
      { input: '3\n5 2024-06-01\n5 2024-06-02\n5 2024-06-03', output: '5', isHidden: true },
    ],
  },
  {
    title: 'Rank Scores',
    description: `Given a list of scores, rank them using **dense ranking** (no gaps in ranking numbers). Output each score with its dense rank, sorted by score in descending order.

This simulates: \`SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) as rank FROM Scores\`.

**Input Format:**
- First line: integer \`n\`
- Second line: \`n\` space-separated floating-point scores

**Output Format:**
- \`n\` lines: \`score rank\` (score formatted to 2 decimal places), sorted by score descending

**Example:**
\`\`\`
Input:
6
3.50 3.65 4.00 3.85 4.00 3.65

Output:
4.00 1
4.00 1
3.85 2
3.65 3
3.65 3
3.50 4
\`\`\``,
    difficulty: 'MEDIUM',
    tags: ['SQL', 'Database', 'Sorting', 'Window Functions'],
    constraints: `- 1 <= n <= 10^5\\n- 0.00 <= score <= 100.00`,
    testCases: [
      { input: '6\n3.50 3.65 4.00 3.85 4.00 3.65', output: '4.00 1\n4.00 1\n3.85 2\n3.65 3\n3.65 3\n3.50 4', isHidden: false },
      { input: '3\n1.00 1.00 1.00', output: '1.00 1\n1.00 1\n1.00 1', isHidden: false },
      { input: '5\n10.00 20.00 30.00 40.00 50.00', output: '50.00 1\n40.00 2\n30.00 3\n20.00 4\n10.00 5', isHidden: true },
      { input: '1\n99.99', output: '99.99 1', isHidden: true },
    ],
  },
  {
    title: 'Rising Temperature',
    description: `Given daily temperature records, find all dates where the temperature was **higher than the previous day's temperature**.

This simulates the classic SQL self-join/LAG problem.

**Input Format:**
- First line: integer \`n\`
- Next \`n\` lines: \`date temperature\` (date in YYYY-MM-DD, temperature as integer)
- Records are NOT necessarily sorted by date

**Output Format:**
- Dates where temperature > previous day's temperature, sorted chronologically
- One date per line. If none, output \`NONE\`

**Example:**
\`\`\`
Input:
4
2024-01-01 10
2024-01-02 25
2024-01-03 20
2024-01-04 30

Output:
2024-01-02
2024-01-04
\`\`\``,
    difficulty: 'EASY',
    tags: ['SQL', 'Database', 'Sorting'],
    constraints: `- 1 <= n <= 10^5\\n- Dates are unique and valid\\n- -100 <= temperature <= 100`,
    testCases: [
      { input: '4\n2024-01-01 10\n2024-01-02 25\n2024-01-03 20\n2024-01-04 30', output: '2024-01-02\n2024-01-04', isHidden: false },
      { input: '3\n2024-05-01 30\n2024-05-02 20\n2024-05-03 10', output: 'NONE', isHidden: false },
      { input: '5\n2024-02-05 0\n2024-02-01 -5\n2024-02-03 10\n2024-02-04 10\n2024-02-02 5', output: '2024-02-02\n2024-02-03', isHidden: true },
      { input: '2\n2024-01-01 0\n2024-01-02 1', output: '2024-01-02', isHidden: true },
    ],
  },
  {
    title: 'Customers Who Never Order',
    description: `Given a list of customers and a list of orders, find all customers who **never placed an order**.

This simulates: \`SELECT name FROM Customers WHERE id NOT IN (SELECT customerId FROM Orders)\`.

**Input Format:**
- First line: integer \`c\` — number of customers
- Next \`c\` lines: \`customer_id customer_name\`
- Next line: integer \`o\` — number of orders
- Next \`o\` lines: \`order_id customer_id\`

**Output Format:**
- Names of customers who never ordered, sorted alphabetically
- One name per line. If all customers have orders, output \`NONE\`

**Example:**
\`\`\`
Input:
4
1 Joe
2 Henry
3 Sam
4 Max
3
1 3
2 1
3 1

Output:
Henry
Max
\`\`\``,
    difficulty: 'EASY',
    tags: ['SQL', 'Database', 'Hash Table'],
    constraints: `- 1 <= c <= 10^4\\n- 0 <= o <= 10^5\\n- Customer IDs are unique`,
    testCases: [
      { input: '4\n1 Joe\n2 Henry\n3 Sam\n4 Max\n3\n1 3\n2 1\n3 1', output: 'Henry\nMax', isHidden: false },
      { input: '2\n1 Alice\n2 Bob\n2\n1 1\n2 2', output: 'NONE', isHidden: false },
      { input: '3\n1 Zara\n2 Amy\n3 Beth\n0', output: 'Amy\nBeth\nZara', isHidden: true },
      { input: '1\n1 Solo\n1\n1 1', output: 'NONE', isHidden: true },
    ],
  },
  {
    title: 'Duplicate Emails',
    description: `Given a list of email addresses, find all emails that appear **more than once**.

This simulates: \`SELECT email FROM Person GROUP BY email HAVING COUNT(*) > 1\`.

**Input Format:**
- First line: integer \`n\`
- Next \`n\` lines: one email per line

**Output Format:**
- Duplicate emails sorted alphabetically, one per line
- If no duplicates, output \`NONE\`

**Example:**
\`\`\`
Input:
5
a@b.com
c@d.com
a@b.com
e@f.com
c@d.com

Output:
a@b.com
c@d.com
\`\`\``,
    difficulty: 'EASY',
    tags: ['SQL', 'Database', 'Hash Table', 'Counting'],
    constraints: `- 1 <= n <= 10^5\\n- Emails consist of lowercase letters, digits, dots, and @`,
    testCases: [
      { input: '5\na@b.com\nc@d.com\na@b.com\ne@f.com\nc@d.com', output: 'a@b.com\nc@d.com', isHidden: false },
      { input: '3\nx@y.com\ny@z.com\nz@w.com', output: 'NONE', isHidden: false },
      { input: '4\ntest@test.com\ntest@test.com\ntest@test.com\nother@test.com', output: 'test@test.com', isHidden: true },
      { input: '1\nsolo@email.com', output: 'NONE', isHidden: true },
    ],
  },
  {
    title: 'Nth Highest Salary',
    description: `Given a list of salaries and an integer \`k\`, find the **kth highest distinct salary**. If it doesn't exist, output \`NULL\`.

This generalizes the "Second Highest Salary" problem and simulates:
\`\`\`sql
SELECT DISTINCT salary FROM Employee
ORDER BY salary DESC LIMIT 1 OFFSET k-1
\`\`\`

**Input Format:**
- First line: two integers \`n k\`
- Second line: \`n\` space-separated integers (salaries)

**Output Format:**
- The kth highest distinct salary, or \`NULL\`

**Example 1:**
\`\`\`
Input:
6 2
100 200 300 200 300 400

Output:
300
\`\`\`

**Example 2:**
\`\`\`
Input:
3 5
100 200 300

Output:
NULL
\`\`\``,
    difficulty: 'MEDIUM',
    tags: ['SQL', 'Database', 'Sorting'],
    constraints: `- 1 <= n <= 10^5\\n- 1 <= k <= n\\n- 1 <= salary[i] <= 10^9`,
    testCases: [
      { input: '6 2\n100 200 300 200 300 400', output: '300', isHidden: false },
      { input: '3 5\n100 200 300', output: 'NULL', isHidden: false },
      { input: '5 1\n10 20 30 40 50', output: '50', isHidden: true },
      { input: '4 3\n100 100 100 100', output: 'NULL', isHidden: true },
    ],
  },
  {
    title: 'Manager with Most Direct Reports',
    description: `Given an organizational hierarchy, find the manager who has the **most direct reports**. If there is a tie, return the one with the smallest ID.

This simulates:
\`\`\`sql
SELECT manager_id, COUNT(*) as cnt FROM Employee
WHERE manager_id IS NOT NULL
GROUP BY manager_id ORDER BY cnt DESC, manager_id ASC LIMIT 1
\`\`\`

**Input Format:**
- First line: integer \`n\`
- Next \`n\` lines: \`employee_id employee_name manager_id\`
  (\`manager_id\` is \`0\` if the employee has no manager)

**Output Format:**
- \`manager_name report_count\`

**Example:**
\`\`\`
Input:
6
1 Alice 0
2 Bob 1
3 Carol 1
4 Dave 1
5 Eve 2
6 Frank 2

Output:
Alice 3
\`\`\``,
    difficulty: 'MEDIUM',
    tags: ['SQL', 'Database', 'Hash Table', 'Counting'],
    constraints: `- 1 <= n <= 10^5\\n- At least one employee has a manager\\n- Employee IDs are unique positive integers`,
    testCases: [
      { input: '6\n1 Alice 0\n2 Bob 1\n3 Carol 1\n4 Dave 1\n5 Eve 2\n6 Frank 2', output: 'Alice 3', isHidden: false },
      { input: '3\n1 Boss 0\n2 Worker1 1\n3 Worker2 1', output: 'Boss 2', isHidden: false },
      { input: '5\n1 A 0\n2 B 1\n3 C 1\n4 D 3\n5 E 3', output: 'A 2', isHidden: true },
      { input: '4\n10 X 0\n20 Y 10\n30 Z 10\n40 W 10', output: 'X 3', isHidden: true },
    ],
  },
];
