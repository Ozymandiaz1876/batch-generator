function generateLANID() {
  let lanID = "GR";
  let alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 6; i++) {
    lanID += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
  }
  return lanID;
}

function generateRandomDOB() {
  const year = getRandomInt(1970, 2000);
  const month = getRandomInt(1, 12);
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = getRandomInt(1, daysInMonth);
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  return `${formattedDay}/${formattedMonth}/${year}`;
}

function generateRandomLoanDisbursementDate() {
  const today = new Date();
  const rangeInDays = 25;
  const startDate = new Date(today.getTime() - rangeInDays * 24 * 60 * 60 * 1000);
  const randomTime = startDate.getTime() + Math.random() * (today.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);
  const day = randomDate.getDate().toString().padStart(2, '0');
  const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
  const year = randomDate.getFullYear();
  return `${day}/${month}/${year}`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateFirstName() {
  const firstNames = [
    'John', 'Jane', 'Michael', 'Emily', 'William', 'Sarah', 'James', 'Emma', 'David', 'Olivia',
    'Benjamin', 'Ava', 'Robert', 'Sophia', 'Joseph', 'Isabella', 'Matthew', 'Mia', 'Daniel', 'Charlotte'
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function generateLastName() {
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson'
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

function generateEmail(firstName, lastName) {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomDomain}`;
}

export function generateSampleData(spoCode, numberOfRecords) {
  const sampleData = [];

  for (let i = 0; i < numberOfRecords; i++) {
    const borrowerFirstName = generateFirstName();
    const borrowerLastName = generateLastName();
    const coBorrowerFirstName = generateFirstName();
    const coBorrowerLastName = generateLastName();

    const data = {
      "SPOCode": spoCode,
      "Master Policyholder Name": "USFB-UNITY SMALL FINANCE BANK",
      "Master Policy No.": 'GR000012',
      "Loan Account No": generateLANID(),
      "Member Application No": `A00${getRandomInt(1000, 9999)}`,
      "Borrower Unique ID number": `${getRandomInt(1, 99)}-${getRandomInt(1, 999)}-${getRandomInt(1, 99999)}A`,
      "Borrower Salutation": "Mr",
      "Borrower Given Name": borrowerFirstName,
      "Borrower Surname": borrowerLastName,
      "Borrower Gender": "Male",
      "Borrower Date of Birth": generateRandomDOB(),
      "Borrower Address Line-1": `${getRandomInt(1, 999)} ${generateRandomString(8)} Street`,
      "Borrower Address Line-2": `Block ${getRandomInt(1, 20)}, ${generateRandomString(10)} Layout`,
      "Borrower Address Line-3": "",
      "Borrower Pin code": "560095",
      "Borrower City": "Bengaluru",
      "Borrower State": "KARNATAKA",
      "Borrower Nationality": "India",
      "Borrower Marital status": "Married",
      "Borrower Educational qualification": "12th",
      "Borrower Occupation": "Self Employed",
      "Borrower Nature of work": "",
      "Borrower Annual Income": getRandomInt(10000, 500000),
      "Borrower Mobile no.": "9876543210",
      "Borrower Email ID": generateEmail(borrowerFirstName, borrowerLastName),
      "Borrower Document Type": "PAN",
      "Borrower Document No.": "IMDPS0534N",
      "Co-borrower Unique ID number": `${getRandomInt(1, 99)}-${getRandomInt(1, 999)}-${getRandomInt(1, 99999)}C`,
      "Co-borrower Salutation": "Mrs",
      "Co-borrower Given Name": coBorrowerFirstName,
      "Co-borrower Surname": coBorrowerLastName,
      "Co-borrower Gender": "Female",
      "Co-borrower Date of Birth": generateRandomDOB(),
      "Co-borrower Address Line-1": `${getRandomInt(1, 999)} ${generateRandomString(8)} Street`,
      "Co-borrower Address Line-2": `Block ${getRandomInt(1, 20)}, ${generateRandomString(10)} Layout`,
      "Co-borrower Address Line-3": "",
      "Co-borrower Pin code": "560095",
      "Co-borrower City": "Bengaluru",
      "Co-borrower State": "KARNATAKA",
      "Co-borrower Nationality": "India",
      "Co-borrower Marital status": "Married",
      "Co-borrower Educational qualification": "Below 10th",
      "Relation with primary borrower": "Spouse",
      "Co-borrower Occupation": "Self Employed",
      "Co-borrower Nature of work": "",
      "Co-borrower Annual Income": getRandomInt(10000, 500000),
      "Co-borrower Mobile no.": "9876543210",
      "Co-borrower Email ID": generateEmail(coBorrowerFirstName, coBorrowerLastName),
      "Co-borrower Document Type": "PAN",
      "Co-borrower Document No.": "IMDPS0534N",
      "Loan Disbursement Date": generateRandomLoanDisbursementDate(),
      "Branch Name": "GOREGAON",
      "Loan Term": 24,
      "Cover Term": 24,
      "Death benefit option (Level/Reducing)": "LEVEL",
      "Premium Option (Single/OYRT)": "SINGLE",
      "Cover Option (Single Life/Joint Life)": "JOINT LIFE",
      "Loan Amount": "35000",
      "Sum Assured": "42000",
      "Premium Amount paid": "1129.40",
      "Loan Type": "CREDIT LIFE",
      "Nominee % share": 100,
      "Nominee FirstName": generateFirstName(),
      "Nominee LastName": generateLastName(),
      "Nominee Mobile": "9876543210",
      "Nominee DOB": generateRandomDOB(),
      "Nominee Gender": "Male",
      "Nominee Address": `${getRandomInt(1, 999)} ${generateRandomString(8)} Street, Block ${getRandomInt(1, 20)}, ${generateRandomString(10)} Layout, Bengaluru - ${getRandomInt(560001, 560100)}`,
      "Nominee Relationship": "Son",
      "Appointee Name if Nominee is minor": "",
      "Appointee DOB": "",
      "Appointee Gender": "",
      "Appointee Relationship": "",
      "DOGH SIGNED (YES/NO)": "YES",
      "NumberOfLives": 2,
      "Height(cms)": getRandomInt(150, 200),
      "Weight(kgs)": getRandomInt(50, 150),
      "Customer_Type_0": "",
      "Customer_Type_1": ""
    };

    sampleData.push(data);
  }

  return sampleData;
}