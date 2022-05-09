import { Router } from 'express';
import { MyRecord } from '../records/my.record.js';

export const myRouter = Router();

myRouter
  .get('/', async (req, res) => {
    console.log('try to connect to db');
    const myList = await MyRecord.listAll();

    res.json({
      myList,
    });
  })

  .get('/:itemId', async (req, res) => {
    const item = await MyRecord.getOne(req.params.itemId);
    res.json({
      item,
    });
  })

  .delete('/:id', async (req, res) => {
    const item = await MyRecord.getOne(req.params.id);

    if (!item) {
      throw new ValidationError('No such item');
    }
    if ((await item.countGivenGifts()) > 0) {
      throw new ValidationError('Cannot remove.');
    }
    await item.delete();

    res.end();
  })

  .post('/', async (req, res) => {
    const newGift = new MyRecord(req.body);
    await newGift.insert();

    res.json(newGift);
  });
