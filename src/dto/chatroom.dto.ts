import { IsString } from 'class-validator'
import { MessageEntity, LastMessageEntity } from '../entities/chatroom.entity'

/** @dev Expose dto for create-chat-room function. */
export class CreateChatRoomDto {
  @IsString()
  senderId: string

  @IsString()
  recieverId: string
}

/** @dev Expose dto for create-user-chat function. */
export class CreateUserChatDto {
  @IsString()
  userId: string

  @IsString()
  recieverId: string

  @IsString()
  displayName: string

  @IsString()
  photoURL: string

  @IsString()
  chatRoomId: string

  lastMessage: LastMessageEntity
}

/** @dev Expose dto for send message function. */
export interface SendMessageDto
  extends Pick<MessageEntity, 'message' | 'attached'> {
  chatRoomId: string
  userId: string
  recieverId: string
}

/** @dev Expose dto for update data in @var {UserChat} */
export type UpdateUserChatDto = Pick<
  CreateUserChatDto,
  'userId' | 'recieverId' | 'chatRoomId' | 'lastMessage'
>
