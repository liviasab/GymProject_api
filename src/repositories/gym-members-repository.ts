export interface GymMembersRepository {
  // ... existing methods ...
  findManyByUserId(userId: string, page: number, per_page: number): Promise<{ memberships: GymMember[], total: number }>;
}