from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import List
from loguru import logger

router = APIRouter()

# Store active connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"WebSocket disconnected. Total connections: {len(self.active_connections)}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.error(f"Error broadcasting message: {e}")
                # Remove broken connection
                self.active_connections.remove(connection)

manager = ConnectionManager()


@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Echo the message back to the client
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            # Broadcast to all other clients
            await manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")


@router.websocket("/ws/match/{match_id}")
async def match_websocket(websocket: WebSocket, match_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle match-specific real-time updates
            await manager.broadcast(f"Match {match_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info(f"Match {match_id} WebSocket disconnected") 