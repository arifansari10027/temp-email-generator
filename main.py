from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Email

Base.metadata.create_all(bind=engine)

app = FastAPI()


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