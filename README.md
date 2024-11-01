# ATS score checker

ATS web application that helps users compare their resumes with job descriptions by identifying keyword similarities. The application filters out common stopwords and provides a similarity score.

## Features

- Upload your resume in `.docx` format.
- Enter the job description in a text field.
- Compare the resume and job description to identify similar keywords.
- Display a similarity score (in percentage) and filtered keywords.
- Back-end support to calculate similarity using a Python script with `spaCy`.

## Tech Stack
**Frontend**
- React.js

**Backend**
- Node.js (Express server)
- Python (`spaCy` library for text processing)

## Prerequisites

- Node.js and npm installed
- Python 3.x installed
- ```spaCy``` library installed:
```bash
pip install spacy
python -m spacy download en_core_web_sm
```
- ```mammoth``` library installed for extracting text from ```.docx```:
```bash
npm install mammoth
```

## Getting Started
**1. Clone the Repository**
```bash
git clone https://github.com/azadsingh3/ATS.git
cd ATS
```
**2. Install Dependencies**
**Backend Dependencies:**
```bash
cd backend
npm install
```
**Frontend Dependencies:**
```bash
cd frontend
npm install
```

## 3. Running the Application

**Backend:**
1. Navigate to the backend folder:
```bash
cd backend
```
2. Start the backend server:

```bash
node server.js
```
**Frontend:**
1. Navigate to the frontend folder:

```bash
cd frontend
```
2. Start the React application:

```bash
npm start
```
The application will be available at http://localhost:3000.

## Usage
1. Upload a resume file in .docx format.
2. Enter a job description in the provided text area.
3. Click on Scan to submit the form.
4. View the similarity score and the list of similar keywords (filtered to exclude common stopwords).

## Endpoints
- `GET /api/status`
Checks the server status.

- `POST /api/scan`
Accepts a resume file and job description, returns the similarity score and keywords.

## Error Handling
- Alerts the user if the resume or job description is not provided.
- Displays error messages if the server fails to connect or process the request.

## Contribution
- Feel free to open an issue or submit a pull request if you encounter any bugs or have feature requests.

## License
This project is licensed under the MIT License.

