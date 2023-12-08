const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateRating,
} = require('./categories'); 
const { Category } = require('../models/category');

jest.mock('../models/category');

describe('test categories functions', () => {
  it('get all categories for a specific owner and respond with the categories', async () => {
    const req = {
      user: { _id: 'someUserId' },
    };
    const res = {
      json: jest.fn(),
    };
    const fakeCategories = [
      {
        _id: 'categoryId1',
        name: 'Category 1',
        deleted: false,
        owner: 'someUserId',
      },
      {
        _id: 'categoryId2',
        name: 'Category 2',
        deleted: false,
        owner: 'someUserId',
      },
    ];
    Category.find.mockResolvedValue(fakeCategories);
    await getAll(req, res);
    expect(res.json).toHaveBeenCalledWith(fakeCategories);
    expect(Category.find).toHaveBeenCalledWith({
      deleted: false,
      owner: 'someUserId',
    });
  });

  it('get a category by id and respond with the category', async () => {
    const req = {
      params: { id: 'categoryId1' },
    };
    const res = {
      json: jest.fn(),
    };

    const fakeCategory = { _id: 'categoryId1', name: 'Category 1' };

    Category.findById.mockResolvedValue(fakeCategory);

    await getById(req, res);

    expect(res.json).toHaveBeenCalledWith(fakeCategory);
    expect(Category.findById).toHaveBeenCalledWith('categoryId1');
  });

  it('add a new category and respond with a 201 status', async () => {
    const req = {
      user: { _id: 'someUserId' },
      body: { name: 'New Category', color: '#FF0000', rating: 8 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const fakeCategory = {
      _id: 'newCategoryId',
      name: 'New Category',
      color: '#FF0000',
      rating: 8,
      owner: 'someUserId',
    };

    Category.create.mockResolvedValue(fakeCategory);

    await add(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeCategory);
    expect(Category.create).toHaveBeenCalledWith({
      ...req.body,
      owner: 'someUserId',
    });
  });

  it('update a category by id and respond with the updated category', async () => {
    const req = {
      params: { id: 'categoryId1' },
      body: { name: 'Updated Category' },
    };
    const res = {
      json: jest.fn(),
    };

    const fakeUpdatedCategory = {
      _id: 'categoryId1',
      name: 'Updated Category',
    };

    Category.findByIdAndUpdate.mockResolvedValue(fakeUpdatedCategory);

    await updateById(req, res);

    expect(res.json).toHaveBeenCalledWith(fakeUpdatedCategory);
    expect(Category.findByIdAndUpdate).toHaveBeenCalledWith(
      'categoryId1',
      req.body,
      { new: true },
    );
  });

  it('mark a category as deleted by id and respond with the updated category', async () => {
    const req = {
      params: { id: 'categoryId1' },
      body: { name: 'Updated Category' },
    };
    const res = {
      json: jest.fn(),
    };

    const fakeUpdatedCategory = {
      _id: 'categoryId1',
      name: 'Updated Category',
      deleted: true,
    };

    Category.findByIdAndUpdate.mockResolvedValue(fakeUpdatedCategory);

    await deleteById(req, res);

    expect(res.json).toHaveBeenCalledWith(fakeUpdatedCategory);
    expect(Category.findByIdAndUpdate).toHaveBeenCalledWith(
      'categoryId1',
      { ...req.body, deleted: true },
      { new: true },
    );
  });

  it('update the rating of a category by id and respond with the updated category', async () => {
    const req = {
      params: { id: 'categoryId1' },
      body: { rating: 9 },
    };
    const res = {
      json: jest.fn(),
    };

    const fakeUpdatedCategory = { _id: 'categoryId1', rating: 9 };

    Category.findByIdAndUpdate.mockResolvedValue(fakeUpdatedCategory);

    await updateRating(req, res);

    expect(res.json).toHaveBeenCalledWith(fakeUpdatedCategory);
    expect(Category.findByIdAndUpdate).toHaveBeenCalledWith(
      'categoryId1',
      req.body,
      { new: true },
    );
  });
});
