import { resolve } from 'path';
import fs from 'fs';

import File from '../models/File';

class ChangeAvatarService {
  async run({ avatarId }) {
    if (!avatarId) return;

    const file = await File.findByPk(avatarId);

    if (file) {
      const { path } = file;
      const filePath = resolve(
        __dirname,
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
        path
      );

      const fileExists = await fs.promises.stat(filePath);

      if (fileExists) {
        await fs.promises.unlink(filePath);
      }

      await file.destroy();
    }
  }
}

export default new ChangeAvatarService();
