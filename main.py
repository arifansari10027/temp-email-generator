from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Email
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "API running"}

@app.get("/emails")
def get_emails():
    return [
        "public@klickon.tech",
        "info@klickon.tech",
        "anonymous@klickon.tech",
        "hello@klickon.tech",
        "info@holamail.dpdns.org",
        "public@holamail.dpdns.org",
        "random@holamail.dpdns.org"
    ]


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 📥 Receive Email 
@app.post("/receive-email")
def receive_email(data: dict, db: Session = Depends(get_db)):
    email = Email(
        to_email=data.get("to"),
        from_email=data.get("from"),
        subject=data.get("subject"),
        body=data.get("body"),
    )
    db.add(email)
    db.commit()
    return {"message": "Email stored"}


# 📬 Get inbox
@app.get("/inbox/{email}")
def get_inbox(email: str, db: Session = Depends(get_db)):
    emails = db.query(Email).filter(Email.to_email == email).all()
    return emails