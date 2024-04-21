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
    result = { 
        'POS': 0.0, 
        'NEG': 0.0, 
        'NEU': 0.0
    }
    n = len(data)

    with torch.no_grad(): 
        for comment in data: 
            # Tokenize the comment
            text = comment.text
            inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
            # Perform inference
            output = model(**inputs)
            # Get the probabilities
            probabilities = torch.softmax(output.logits, dim=1).tolist()[0]
            prob_indexed = enumerate(probabilities)
            max_index, _ = max(prob_indexed, key=lambda x: x[1])
            prob_label = labels[max_index]
            result[prob_label] += 1/n
    
    
    print(result)

    return result

