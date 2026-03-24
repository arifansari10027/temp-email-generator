from sqlalchemy import Column, Integer, String, Text
from database import Base

class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    to_email = Column(String, index=True)
    from_email = Column(String)
    subject = Column(String)
    body = Column(String)