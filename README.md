📊 Investor Insight
AI-Powered Stock Prediction Platform

Investor Insight is a full-stack web application that delivers stock price predictions using a Deep Learning LSTM Model exposed through a REST API.

This project demonstrates the integration of:

✔ Machine Learning
✔ API Development
✔ Full Stack Web Engineering
✔ Data Visualization

🚀 Project Overview

Investor Insight provides predictive analytics for stock prices by combining a trained LSTM neural network with a modern web application architecture.

Users can:

• Enter stock symbols
• Request AI predictions
• Visualize forecasted trends
• Interact with a responsive UI

🧠 Core Concept

Rather than embedding ML logic directly into the frontend, the system follows a production-style AI deployment pipeline:

LSTM Model → API Layer → Web Application → User


This mirrors how real-world AI products are built.

🏗 System Architecture
1️⃣ Machine Learning Layer

LSTM Neural Network

Trained on historical stock data

Generates price predictions

2️⃣ API Layer

Handles prediction requests

Interfaces with ML model

Returns structured responses

3️⃣ Web Application

User input interface

Data visualization dashboard

Displays predictions & insights

🛠 Tech Stack
Machine Learning

Python

TensorFlow / Keras

NumPy

Pandas

Scikit-learn

Backend / API

RESTful API

Frontend

HTML

CSS

JavaScript

Bootstrap

📊 Features

✔ AI-based stock price prediction
✔ REST API-driven inference
✔ Interactive UI
✔ Prediction visualization
✔ Modular architecture

⚙️ How It Works

User enters a stock symbol

Frontend sends request to API

API invokes LSTM model

Model generates prediction

API returns response

UI renders charts & insights

📦 Installation

Clone the repository:

git clone https://github.com/yourusername/investor-insight.git
cd investor-insight


Install dependencies:

pip install -r requirements.txt


Run the backend server:

python app.py

▶️ API Usage Example
Request
GET /predict?symbol=AAPL

Response
{
  "symbol": "AAPL",
  "predictions": [ ... ],
  "trend": "upward"
}

📈 Output

✔ Forecasted stock prices
✔ Trend visualization
✔ Comparative analysis

🔮 Future Enhancements

• Real-time stock data integration
• Technical indicators (RSI, MACD, etc.)
• Portfolio tracking
• Multi-stock comparison
• Cloud deployment
• Model optimization

⚠️ Disclaimer

This project is for educational and demonstration purposes only.

Stock predictions are inherently uncertain and not financial advice.


DEMO PICTURES : 

<img width="430" height="236" alt="image" src="https://github.com/user-attachments/assets/60d51039-2a44-4226-9f94-c52bbce9346c" />

<img width="416" height="185" alt="image" src="https://github.com/user-attachments/assets/53eb0f2a-f294-4ea0-977f-8317bd3343a4" />

<img width="398" height="221" alt="image" src="https://github.com/user-attachments/assets/0ffcc949-d05e-4e7f-b3cd-96278057f210" />

<img width="397" height="224" alt="image" src="https://github.com/user-attachments/assets/097bc0ea-7f91-44db-82e9-93b64e9f0cfb" />

<img width="405" height="517" alt="image" src="https://github.com/user-attachments/assets/36c18ff7-9854-453b-a680-3dd8aace4080" />
