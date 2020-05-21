import { define } from 'typeorm-seeding';
import { File } from '../../src/files/file.entity';

define(File, () => {
  return new File()
})
