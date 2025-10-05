#!/bin/bash
set -e

echo "🌐 ResumeParsePro - MongoDB Atlas Edition"
echo "======================================="
echo ""
echo "✨ No local MongoDB required - uses cloud database!"

if ! command -v node &> /dev/null; then
    echo "❌ Install Node.js: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js $(node --version)"

if ! command -v py &> /dev/null; then
    echo "❌ Install py: https://python.org/"
    exit 1
fi
echo "✅ Python $(py --version | cut -d' ' -f2)"

echo "📦 Installing dependencies..."
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

echo "🤖 Setting up AI service..."
cd ai-service
py -m venv venv

# Cross-platform virtualenv activation
if [ -f "venv/bin/activate" ]; then
  source venv/bin/activate
elif [ -f "venv/Scripts/activate" ]; then
  source venv/Scripts/activate
else
  echo "ERROR: Could not find virtualenv activate script"
  exit 1
fi

pip install --upgrade pip
pip install Flask==2.3.3 Flask-CORS==4.0.0 requests==2.31.0 python-dotenv==1.0.0 nltk==3.8.1 textstat==0.7.3

py -c "
try:
    import nltk, ssl
    try: _create_unverified_https_context = ssl._create_unverified_context
    except: pass
    else: ssl._create_default_https_context = _create_unverified_https_context
    nltk.download('punkt', quiet=True)
    print('✅ AI models ready')
except: print('⚠️ AI fallback mode')
"
deactivate
cd ..

echo ""
echo "🌐 MongoDB Atlas Setup"
echo "====================="
echo ""
echo "You need a connection string like:"
echo "mongodb+srv://username:password@cluster.mongodb.net/resumeparspro"
echo ""
echo "📝 To get your Atlas connection string:"
echo "1. Visit: https://www.mongodb.com/atlas/database"
echo "2. Create free account and cluster"
echo "3. Database Access > Add user (username/password)"
echo "4. Network Access > Add IP (0.0.0.0/0 for dev)"
echo "5. Clusters > Connect > Drivers > Copy string"

while true; do
    echo -n "🔗 Paste your MongoDB Atlas URI: "
    read MONGODB_URI

    if [[ $MONGODB_URI == mongodb+srv://* ]] || [[ $MONGODB_URI == mongodb://* ]]; then
        echo "✅ URI looks valid!"
        break
    else
        echo "❌ Invalid format. Should start with mongodb+srv://"
    fi
done

cat > backend/.env << EOF
NODE_ENV=development
PORT=3001
MONGODB_URI=$MONGODB_URI
JWT_SECRET=resumeparspro_atlas_jwt_secret_super_secure_12345
AI_SERVICE_URL=http://localhost:5001
FRONTEND_URL=http://localhost:5173
EOF

echo ""
echo "✅ SETUP COMPLETE!"
echo "=================="
echo ""
echo "🚀 Start the app: npm run dev"
echo "🌐 Frontend: http://localhost:5173"
echo "🗄️ Database: MongoDB Atlas (Cloud)"
echo "🎨 Beautiful UI with real registration!"
