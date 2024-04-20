from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

# Load the model and tokenizer
model_name = "wonrax/phobert-base-vietnamese-sentiment"
model = AutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Receive array string from Node.js
def predict_sentiment(data): 
# Define the labels
    labels = ['NEG', 'POS', 'NEU']
    result = []

    with torch.no_grad(): 
        for comment in data: 
            # Tokenize the comment
            text = comment.text
            inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
            # Perform inference
            output = model(**inputs)
            # Get the probabilities
            probabilities = torch.softmax(output.logits, dim=1).tolist()[0]
            # Map probabilities to labels
            prediction_format = {'sentiment': probabilities}
            prediction_format['text'] = text
            prob_indexed = enumerate(probabilities)
            max_index, max_value = max(prob_indexed, key=lambda x: x[1])
            prediction_format['label'] = labels[max_index]
            result.append(prediction_format)

    return result

