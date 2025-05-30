import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, ArrowLeft, Share2, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
  author: {
    name: string
    avatar: string
  }
}

// Sample blog posts data with full content
const blogPosts: Record<string, BlogPost> = {
  "building-scalable-data-pipelines": {
    id: "building-scalable-data-pipelines",
    title: "Building Scalable Data Pipelines with Apache Kafka and Python",
    excerpt:
      "Learn how to design and implement robust data pipelines that can handle millions of events per day using Apache Kafka, Python, and modern cloud infrastructure.",
    content: `
# Building Scalable Data Pipelines with Apache Kafka and Python

In today's data-driven world, the ability to process and analyze large volumes of data in real-time has become crucial for businesses to stay competitive. In this comprehensive guide, we'll explore how to build scalable data pipelines using Apache Kafka and Python.

## Why Apache Kafka?

Apache Kafka is a distributed streaming platform that excels at handling high-throughput, fault-tolerant, and scalable data streams. Here's why it's perfect for modern data pipelines:

- **High Throughput**: Can handle millions of messages per second
- **Fault Tolerance**: Built-in replication and partitioning
- **Scalability**: Horizontal scaling across multiple nodes
- **Durability**: Messages are persisted to disk

## Architecture Overview

Our data pipeline architecture consists of several key components:

1. **Data Producers**: Applications that send data to Kafka topics
2. **Kafka Cluster**: The central messaging system
3. **Data Consumers**: Applications that process data from Kafka topics
4. **Data Storage**: Where processed data is stored (databases, data lakes)

## Setting Up Kafka with Python

First, let's set up our development environment:

\`\`\`bash
pip install kafka-python pandas numpy
\`\`\`

### Creating a Producer

Here's a simple Kafka producer in Python:

\`\`\`python
from kafka import KafkaProducer
import json
import time

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: json.dumps(x).encode('utf-8')
)

def send_user_event(user_id, event_type, timestamp):
    event = {
        'user_id': user_id,
        'event_type': event_type,
        'timestamp': timestamp
    }
    producer.send('user-events', value=event)
    producer.flush()
\`\`\`

### Creating a Consumer

And here's a corresponding consumer:

\`\`\`python
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'user-events',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    event = message.value
    print(f"Processing event: {event}")
    # Process the event here
\`\`\`

## Best Practices

1. **Partitioning Strategy**: Choose partition keys wisely to ensure even distribution
2. **Error Handling**: Implement proper error handling and retry mechanisms
3. **Monitoring**: Use tools like Kafka Manager or Confluent Control Center
4. **Schema Evolution**: Use Avro or JSON Schema for data validation

## Conclusion

Building scalable data pipelines with Kafka and Python provides a robust foundation for real-time data processing. The combination offers flexibility, scalability, and reliability needed for modern data architectures.
    `,
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Data Engineering",
    tags: ["Apache Kafka", "Python", "Data Engineering", "Microservices"],
    image: "/placeholder.svg?height=400&width=800",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  "react-server-components-guide": {
    id: "react-server-components-guide",
    title: "A Complete Guide to React Server Components in Next.js 14",
    excerpt:
      "Dive deep into React Server Components and learn how they revolutionize the way we build modern web applications with improved performance and developer experience.",
    content: `
# A Complete Guide to React Server Components in Next.js 14

React Server Components represent a paradigm shift in how we build React applications. They allow us to render components on the server, reducing the JavaScript bundle size and improving performance.

## What are React Server Components?

Server Components are React components that render on the server and send the rendered output to the client. Unlike traditional SSR, Server Components don't hydrate on the client side.

## Key Benefits

- **Reduced Bundle Size**: Server Components don't ship JavaScript to the client
- **Better Performance**: Faster initial page loads
- **Direct Database Access**: Can directly access databases and APIs
- **Improved SEO**: Content is rendered on the server

## Server vs Client Components

### Server Components (Default in App Router)
\`\`\`tsx
// This is a Server Component by default
export default function UserProfile({ userId }: { userId: string }) {
  // Can directly access database
  const user = await getUserFromDatabase(userId)
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
\`\`\`

### Client Components
\`\`\`tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
\`\`\`

## Best Practices

1. **Use Server Components by default**
2. **Only use Client Components when needed** (interactivity, hooks, browser APIs)
3. **Pass data down from Server to Client Components**
4. **Avoid importing Server Components into Client Components**

## Data Fetching Patterns

### Parallel Data Fetching
\`\`\`tsx
async function Dashboard() {
  // These fetch in parallel
  const userPromise = getUser()
  const postsPromise = getPosts()
  
  const [user, posts] = await Promise.all([userPromise, postsPromise])
  
  return (
    <div>
      <UserInfo user={user} />
      <PostsList posts={posts} />
    </div>
  )
}
\`\`\`

## Conclusion

React Server Components in Next.js 14 provide a powerful way to build performant, scalable applications. By understanding when to use Server vs Client Components, you can create better user experiences.
    `,
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Frontend Development",
    tags: ["React", "Next.js", "Server Components", "Performance"],
    image: "/placeholder.svg?height=400&width=800",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  "machine-learning-production": {
    id: "machine-learning-production",
    title: "Deploying Machine Learning Models to Production: Best Practices",
    excerpt:
      "A comprehensive guide on taking your ML models from Jupyter notebooks to production-ready APIs with proper monitoring, versioning, and scalability considerations.",
    content: `
# Deploying Machine Learning Models to Production: Best Practices

Moving from a Jupyter notebook to a production ML system involves many considerations beyond just the model itself. This guide covers the essential practices for successful ML deployment.

## The ML Production Pipeline

A production ML system consists of several components:

1. **Data Pipeline**: Ingesting and preprocessing data
2. **Model Training**: Training and validation workflows
3. **Model Serving**: API endpoints for predictions
4. **Monitoring**: Tracking model performance and data drift
5. **CI/CD**: Automated testing and deployment

## Model Serving Strategies

### REST API with FastAPI

\`\`\`python
from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel

app = FastAPI()

# Load model at startup
model = joblib.load("model.pkl")

class PredictionRequest(BaseModel):
    features: list[float]

@app.post("/predict")
async def predict(request: PredictionRequest):
    features = np.array(request.features).reshape(1, -1)
    prediction = model.predict(features)
    return {"prediction": prediction.tolist()}
\`\`\`

### Batch Prediction Pipeline

\`\`\`python
import pandas as pd
from sklearn.externals import joblib

def batch_predict(input_file: str, output_file: str):
    # Load data
    data = pd.read_csv(input_file)
    
    # Load model
    model = joblib.load("model.pkl")
    
    # Make predictions
    predictions = model.predict(data)
    
    # Save results
    results = pd.DataFrame({
        'id': data['id'],
        'prediction': predictions
    })
    results.to_csv(output_file, index=False)
\`\`\`

## Model Versioning and Experiment Tracking

Use tools like MLflow for experiment tracking:

\`\`\`python
import mlflow
import mlflow.sklearn

with mlflow.start_run():
    # Train model
    model = train_model(X_train, y_train)
    
    # Log metrics
    mlflow.log_metric("accuracy", accuracy_score(y_test, predictions))
    mlflow.log_metric("f1_score", f1_score(y_test, predictions))
    
    # Log model
    mlflow.sklearn.log_model(model, "model")
\`\`\`

## Monitoring and Alerting

### Data Drift Detection

\`\`\`python
from scipy import stats

def detect_drift(reference_data, current_data, threshold=0.05):
    """Detect data drift using Kolmogorov-Smirnov test"""
    statistic, p_value = stats.ks_2samp(reference_data, current_data)
    return p_value < threshold
\`\`\`

### Performance Monitoring

\`\`\`python
import logging
from datetime import datetime

def log_prediction(features, prediction, actual=None):
    log_data = {
        'timestamp': datetime.now().isoformat(),
        'features': features,
        'prediction': prediction,
        'actual': actual
    }
    logging.info(f"Prediction logged: {log_data}")
\`\`\`

## Deployment Strategies

### Blue-Green Deployment

1. Deploy new model version to "green" environment
2. Test thoroughly in green environment
3. Switch traffic from "blue" to "green"
4. Keep blue as fallback

### Canary Deployment

1. Deploy new model to small subset of traffic
2. Monitor performance metrics
3. Gradually increase traffic to new model
4. Rollback if issues detected

## Best Practices Summary

1. **Version everything**: Code, data, models, and configurations
2. **Automate testing**: Unit tests, integration tests, and model validation
3. **Monitor continuously**: Track model performance and data quality
4. **Plan for rollbacks**: Always have a fallback strategy
5. **Document thoroughly**: Model cards, API documentation, and runbooks

## Conclusion

Successful ML deployment requires careful planning and robust engineering practices. By following these best practices, you can build reliable, scalable ML systems that deliver value in production.
    `,
    date: "2024-01-05",
    readTime: "15 min read",
    category: "Machine Learning",
    tags: ["Machine Learning", "MLOps", "Python", "Docker", "API"],
    image: "/placeholder.svg?height=400&width=800",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header spacing */}
      <div className="h-16"></div>

      {/* Back to blog */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 mb-8">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Article Content */}
      <article className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge>{post.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1 h-4 w-4" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>

          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

          {/* Author and Share */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-medium">{post.author.name}</span>
            </div>

            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </header>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>

        {/* Related Links */}
        <Card className="mt-12">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
            <div className="space-y-2">
              <Link
                href="https://github.com/JamesrPrince"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <Github className="mr-2 h-4 w-4" />
                View source code on GitHub
              </Link>
              <Link
                href="https://demo.com"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live demo
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-12 pt-8 border-t">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Posts
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </article>
    </div>
  )
}
