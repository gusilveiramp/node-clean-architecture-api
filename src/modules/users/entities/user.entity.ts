export class UserEntity {
  id?: number;
  name!: string;
  email!: string;
  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
