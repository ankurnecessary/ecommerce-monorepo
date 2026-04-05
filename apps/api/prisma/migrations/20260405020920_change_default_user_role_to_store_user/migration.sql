-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'storeUser';

-- Update existing user's with role 'user' to have 'storeUser' now
UPDATE public."User"
	SET role='storeUser'
	WHERE role='user';