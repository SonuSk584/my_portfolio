export const projects = [
  {
    "id": 1,
    "title": "Polyglot Chat - Real-time Multilingual Chat Application",
    "description": "A real-time multi-user chat app with live message translation, built with Spring Boot, STOMP/WebSocket, React, and MongoDB, and deployed with Docker and CI/CD.",
    "detailedDescription": "Built a real-time multi-user chat application using Spring Boot, STOMP/WebSocket, React, and MongoDB, with authentication, message persistence, and real-time translation. Engineered a resilient translation API integration with retry/backoff and graceful fallback to handle third-party service failures. Diagnosed and resolved data integrity and message-delivery issues, including duplicate WebSocket broadcasts and MongoDB unique-index collisions on nullable fields, using server-side logs and authoritative state reconciliation. Containerized and deployed the application using Docker and Render with GitHub Actions CI/CD, externalized configuration, and resolved deployment-specific CORS and networking issues.",
    "image": "/images/PG chat.png",
    "technologies": [
      "Java",
      "Spring Boot",
      "WebSocket",
      "STOMP",
      "MongoDB",
      "React",
      "Docker",
      "GitHub Actions",
      "Render"
    ],
    "github": "https://github.com/SonuSk584/POLYGLOT.git",
    "live": "https://polyglot-six-amber.vercel.app/chat",
    "featured": true
  },
  {
    "id": 2,
    "title": "Customer Churn Prediction - Telco Dataset",
    "description": "An end-to-end machine learning pipeline predicting customer churn on 7,043 customers, optimized for recall and reaching 0.844 ROC-AUC with a Random Forest model.",
    "detailedDescription": "Built a leakage-safe ETL and modeling pipeline (Pipeline/ColumnTransformer) on a 7,043-customer dataset, with domain-grounded imputation and engineered features validated via A/B comparison against a raw-feature baseline. Compared 5 model families (Logistic Regression, Decision Tree, Random Forest, SVM, Gradient Boosting) using 5-fold stratified cross-validation and hyperparameter tuning, selecting Random Forest as the final model based on F1 and PR-AUC. Optimized for recall (78%) over raw accuracy to reflect the higher business cost of missed churners versus false retention alerts, achieving 0.844 ROC-AUC and 0.657 PR-AUC on held-out test data. Ran an ablation on ensembling (bagged vs. single Logistic Regression), reporting a negative result to validate the model choice rather than assume improvement.",
    "image": "/images/Churn.jpg",
    "technologies": [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Matplotlib"
    ],
    "github": "https://github.com/SonuSk584/Churn-prediction.git",
    "live": "",
    "featured": true
  },
  {
    "id": 3,
    "title": "GoFood - Full-Stack Food Ordering Platform",
    "description": "A full-stack food ordering platform with authentication, admin workflows, order management, and Razorpay payment integration.",
    "detailedDescription": "Developed and deployed GoFood, a full-stack food ordering platform, working across React.js, Node.js, Express.js, MongoDB, and REST APIs. Implemented user authentication, admin workflows, and order management, along with Razorpay payment integration for checkout.",
    "image": "/images/gofood.gif",
    "technologies": [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Razorpay"
    ],
    "github": "https://github.com/SonuSk584/GoFood.git",
    "live": "https://go-food-alpha.vercel.app/",
    "featured": false
  }
];