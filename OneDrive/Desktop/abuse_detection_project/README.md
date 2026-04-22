# 🎥 Violence Detection in Videos using Deep Learning

A comprehensive machine learning system for detecting violence and abuse in videos using deep learning models, pose estimation, and explainable AI techniques.

**Status**: ✅ Working | **License**: MIT | **Python**: 3.8+

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Training](#training)
- [Web Application](#web-application)
- [How It Works](#how-it-works)
- [Models](#models)
- [Datasets](#datasets)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This project provides a **dual-model violence detection system**:

1. **Image-based Detection**: Classifies static images as violent/non-violent using MobileNetV2 CNN
2. **Video-based Detection**: Analyzes video sequences using temporal CNNs for real-world scenarios

The system combines:

- 🧠 **Deep Learning** (TensorFlow/Keras)
- 🤖 **Pose Estimation** (MediaPipe + YOLOv8)
- 📊 **Explainability** (Grad-CAM heatmaps)
- 🔄 **Multi-dataset Training** (RWF-2000, VioPeru, real-world videos)

---

## ✨ Features

✅ **Multi-modal Detection**

- Image-based violence classification
- Video-based temporal analysis
- Real-time pose skeleton detection

✅ **Explainable AI**

- Grad-CAM heatmap visualization
- Pose rule scoring breakdown
- Confidence scores with reasoning

✅ **Web Interface**

- Flask-based web application
- Upload images or videos
- Real-time predictions with visualizations

✅ **Easy Deployment**

- Pre-trained models included
- Render-ready configuration
- Docker support (optional)

✅ **Multi-Dataset Support**

- RWF-2000 (Real-World Fight dataset)
- VioPeru Dataset
- Custom dataset support

---

## 📁 Project Structure

```
abuse_detection_project/
│
├── 🔧 Core Scripts
│   ├── app.py                      # Flask web application
│   ├── train_video_model.py        # Train video violence model
│   ├── train_model.py              # Train image violence model
│   ├── combine_and_train.py        # Multi-dataset training
│   ├── predict.py                  # Prediction pipeline
│   ├── pose_detection.py           # Pose estimation (MediaPipe/YOLOv8)
│   └── gradcam.py                  # Grad-CAM visualization
│
├── 📊 Data Processing
│   ├── convert_dataset.py
│   ├── download_dataset.py
│   ├── download_rwf.py
│   ├── extract.py
│   ├── preprocess_and_save.py
│   └── check_labels.py
│
├── 🤖 Pre-trained Models (~100MB, excluded from git)
│   ├── best_video_model_phase1.h5
│   ├── best_video_model_phase2.h5
│   └── [other .h5 files]
│
├── 🎨 Web Interface
│   ├── templates/                  # HTML templates
│   └── static/                     # CSS, JS, assets
│
├── 📂 Data Folders
│   ├── combined_video_dataset/
│   ├── dataset/                    # For image training
│   └── uploads/                    # User uploads
│
├── 📄 Configuration
│   ├── requirements.txt
│   ├── render.yaml                 # Render deployment config
│   ├── .gitignore
│   └── README.md
│
└── 📈 Results
    ├── training_results.png
    └── video_training_results.png
```

---

## 🚀 Installation

### Prerequisites

- Python 3.8 or higher
- pip or conda
- 4GB+ RAM (8GB+ recommended for training)
- GPU optional but recommended for training

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/abuse-detection.git
cd abuse-detection
```

### Step 2: Create Virtual Environment (Recommended)

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:

- `tensorflow` — Deep learning framework
- `opencv-python` — Video/image processing
- `mediapipe` — Pose estimation
- `ultralytics` — YOLOv8 for pose detection
- `flask` — Web framework
- `gunicorn` — Production server
- And more...

---

## ⚡ Quick Start

### 1. Test with Pre-trained Models

Use the included pre-trained models to make predictions:

```bash
# Test on a single image
python predict.py path/to/image.jpg

# Test pose detection only
python pose_detection.py path/to/image.jpg

# Test Grad-CAM visualization
python gradcam.py path/to/image.jpg
```

### 2. Run Web Application

```bash
python app.py
```

Opens at `http://localhost:5000`

- Upload images or videos
- Get real-time predictions
- View Grad-CAM heatmaps
- See pose skeleton analysis

### 3. Quick Test Video Processing

```bash
python combine_and_train.py --predict path/to/video.mp4
```

---

## 🧠 Training

### Train Image-based Model

```bash
python train_model.py
```

**Configuration** (edit `train_model.py`):

- Set `DATASET_PATH` to your dataset folder
- Adjust `epochs`, `batch_size` as needed

**Output:**

- `models/best_model.keras`
- `outputs/training_results.png` (accuracy/loss graphs)

### Train Video-based Model

```bash
python train_video_model.py
```

**Requirements:**

- Dataset structure:
  ```
  video_dataset/
  ├── violence/      (violent videos)
  └── non_violence/  (non-violent videos)
  ```

**Output:**

- `best_video_model_phase1.h5` (initial training)
- `best_video_model_phase2.h5` (fine-tuned)

### Combine Multiple Datasets & Train

```bash
python combine_and_train.py
```

Automatically:

- Downloads/processes RWF-2000
- Combines with local datasets
- Trains unified model
- Generates results

---

## 🌐 Web Application

### Features

- **Image Upload**: Classify single images
- **Video Upload**: Analyze video sequences
- **Real-time Results**: Instant predictions with scores
- **Explainability**: Grad-CAM heatmaps show where model focused
- **Pose Analysis**: Skeleton visualization and rule scoring
- **Report Generation**: Detailed markdown reports

### How Scoring Works

```
Final Score = (CNN Score × 0.60) + (Pose Score × 0.40)

Threshold:
  Score ≥ 0.50  →  VIOLENT ⚠️
  Score <  0.50  →  NON-VIOLENT ✅

Pose Rules (+points):
  • Arm raised above shoulder (+0.20)
  • Sharp elbow bend < 90° (+0.20)
  • Wrist near head (+0.30)
  • Strong lateral body lean (+0.15)
  • Deep knee bend (+0.15)
```

---

## 🤖 Models

### Pre-trained Models Included

| Model                        | Size  | Type               | Accuracy |
| ---------------------------- | ----- | ------------------ | -------- |
| `best_video_model_phase1.h5` | 18MB  | Video (Initial)    | 85%+     |
| `best_video_model_phase2.h5` | 27MB  | Video (Fine-tuned) | 92%+     |
| `violence_model_v2.h5`       | 23MB  | Image              | 90%+     |
| `yolov8n-pose.pt`            | 6.6MB | Pose Detection     | -        |

### Model Architecture

**Video Model:**

- Input: 16-frame sequences (224×224)
- Backbone: CNN + LSTM
- Output: Violence probability (0-1)

**Image Model:**

- Base: MobileNetV2 (pre-trained on ImageNet)
- Custom Head: Dense layers + Dropout
- Output: Violence probability (0-1)

---

## 📊 Datasets

### Supported Datasets

1. **RWF-2000** (Real-World Fight)
   - 1000 videos (fight/normal)
   - Download: `python download_rwf.py`

2. **VioPeru**
   - Peruvian violence dataset
   - Included in repository

3. **Custom Datasets**
   - Place videos in `video_dataset/violence/` and `.../non_violence/`
   - Or images in `dataset/violence/` and `.../non-violence/`

### Dataset Preparation

```bash
# Download RWF-2000
python download_rwf.py

# Convert video format
python convert_dataset.py --input videos/ --output frames/ --format jpg

# Extract frames from videos
python extract.py --video path/to/video.mp4 --output frames/

# Verify dataset labels
python check_labels.py
```

---

## 🚀 Deployment

### Deploy to Render

1. **Create GitHub Repository**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Select your GitHub repository
   - Render auto-detects `render.yaml`
   - Click "Deploy"

3. **Environment Variables** (set in Render Dashboard)
   ```
   PYTHON_VERSION=3.11
   ```

### Local Deployment

**Using Gunicorn:**

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

**Using Docker** (optional):

```bash
docker build -t abuse-detection .
docker run -p 5000:5000 abuse-detection
```

### Limitations

⚠️ **Free Tier (Render/Heroku):**

- 512MB RAM (tight with TensorFlow)
- Spins down after 15 min inactivity
- ~10s cold start time

✅ **Recommended:** Paid tier or AWS/GCP for production

---

## 🔍 How It Works

### Pipeline for Image Prediction

```
Input Image
    ↓
[Face Detection] → [Pose Skeleton]
    ↓
[MobileNetV2 CNN] → CNN Score
    ↓
[Pose Rule Checker] → Pose Score
    ↓
[Fusion: 60% CNN + 40% Pose] → Final Score
    ↓
[Grad-CAM Visualization]
    ↓
Output: Verdict + Confidence + Heatmap
```

### Pipeline for Video Prediction

```
Input Video
    ↓
[Frame Extraction] → 16-frame sequences
    ↓
[Preprocessing] → 224×224 normalization
    ↓
[CNN + LSTM] → Temporal Violence Score
    ↓
[Pose Analysis] → Per-frame poses
    ↓
Output: Violence Probability + Timeline
```

---

## 🐛 Troubleshooting

### Error: "No trained model found"

```bash
# Ensure models are in the correct location:
# models/best_model.keras (image)
# best_video_model_phase2.h5 (video)

# Or download pre-trained models:
python download_models.py
```

### Error: "Cannot read image/video"

- Check file path is correct
- Ensure file is not corrupted
- Try different format (JPG, PNG for images; MP4, AVI for videos)

### Error: "MediaPipe installation fails"

```bash
# Try older version
pip install mediapipe==0.10.3

# Or use conda
conda install -c conda-forge mediapipe
```

### Error: "TensorFlow/CUDA issues"

```bash
# Create fresh virtual environment
python -m venv venv_fresh
source venv_fresh/bin/activate  # or venv_fresh\Scripts\activate on Windows
pip install -r requirements.txt
```

### Error: "Out of memory during training"

- Reduce `batch_size` in training scripts
- Use smaller input size
- Train on GPU instead of CPU

### Error: "Low accuracy on custom dataset"

- Ensure dataset is balanced (similar # of violence/non-violence)
- Data augmentation often helps
- Collect more diverse samples
- Check for mislabeled images

---

## 📚 Additional Resources

- [TensorFlow Documentation](https://tensorflow.org)
- [MediaPipe Pose](https://mediapipe.dev/solutions/pose)
- [YOLOv8 Docs](https://docs.ultralytics.com/)
- [Flask Web Framework](https://flask.palletsprojects.com/)
- [Grad-CAM Paper](https://arxiv.org/abs/1610.02055)

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👤 Author

**Ketki Gaikwad**

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## ⭐ Star if Helpful!

If you found this project useful, please give it a star ⭐
