import { Router, Request, Response } from 'express';
import { mock_entries } from '../mockdata/mock_entries';
import { Roles } from '../models/auth.types';

const router = Router();

router.get('/entries', (req: Request, res: Response) => {
  console.log("entries:");

  const username = req.query.username as string;
  const role = req.query.role as string;

  if (!username || !role) {
    res.status(400).json({ error: "username and role query parameters required" });
    return;
  }

  let filteredEntries = mock_entries;

  // Teachers see all entries, students only see their own
  if (role !== Roles.TEACHER) {
    filteredEntries = mock_entries.filter(entry => entry.username === username);
  }

  res.status(200).json(filteredEntries);
});

export default router;