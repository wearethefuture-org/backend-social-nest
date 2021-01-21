import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'You File incorrect, please use format: jpeg, jpg, png, gif',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = uuidv1();
  callback(null, `${randomName}${fileExtName}`);
};
