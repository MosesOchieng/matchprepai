from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.user import User, UserCreate
from core.security import get_password_hash
from typing import Optional
from loguru import logger


class UserService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        result = await self.db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def get_by_username(self, username: str) -> Optional[User]:
        """Get user by username"""
        result = await self.db.execute(select(User).where(User.username == username))
        return result.scalar_one_or_none()

    async def get_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def create_user(self, user_data: UserCreate) -> User:
        """Create a new user"""
        # Hash the password
        hashed_password = get_password_hash(user_data.password)
        
        # Create user object
        user = User(
            email=user_data.email,
            username=user_data.username,
            full_name=user_data.full_name,
            role=user_data.role,
            team_id=user_data.team_id,
            hashed_password=hashed_password
        )
        
        # Add to database
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        
        logger.info(f"Created new user: {user.email}")
        return user

    async def update_user(self, user_id: int, update_data: dict) -> Optional[User]:
        """Update user information"""
        user = await self.get_by_id(user_id)
        if not user:
            return None
        
        # Update fields
        for field, value in update_data.items():
            if hasattr(user, field) and value is not None:
                setattr(user, field, value)
        
        await self.db.commit()
        await self.db.refresh(user)
        
        logger.info(f"Updated user: {user.email}")
        return user

    async def delete_user(self, user_id: int) -> bool:
        """Delete a user"""
        user = await self.get_by_id(user_id)
        if not user:
            return False
        
        await self.db.delete(user)
        await self.db.commit()
        
        logger.info(f"Deleted user: {user.email}")
        return True

    async def verify_user(self, user_id: int) -> Optional[User]:
        """Verify a user account"""
        user = await self.get_by_id(user_id)
        if not user:
            return None
        
        user.is_verified = True
        await self.db.commit()
        await self.db.refresh(user)
        
        logger.info(f"Verified user: {user.email}")
        return user 