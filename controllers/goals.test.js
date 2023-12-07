const {
  getAll,
  add,
  updateById,
  deleteById,
  updateStatus,
  getAllByCategory,
} = require('./goals');
const { Goal } = require('../models/goal');

jest.mock('../models/goal');

describe('test goals functions', () => {
  it('get all goals for a specific user', async () => {
    const req = {
      user: { _id: 'someUserId' },
    };
    const res = {
      json: jest.fn(),
    };
    const fakeGoals = [
      { _id: 'goalId1', title: 'Goal 1', deleted: false, owner: 'someUserId' },
      { _id: 'goalId2', title: 'Goal 2', deleted: false, owner: 'someUserId' },
    ];
    Goal.find.mockResolvedValue(fakeGoals);
    await getAll(req, res);
    expect(res.json).toHaveBeenCalledWith(fakeGoals);
    expect(Goal.find).toHaveBeenCalledWith({
      deleted: false,
      owner: 'someUserId',
    });
  });

  it('add a new goal and respond with a 201 status', async () => {
    const req = {
      user: { _id: 'someUserId' },
      body: {
        title: 'New Goal',
        habitStart: '01-01-2023',
        deadline: '01-31-2023',
        progress: 0,
        value: 5,
        category: '6564a96a9dfe5e278e57c29e',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const fakeGoal = {
      _id: 'newGoalId',
      title: 'New Goal',
      habitStart: '01-01-2023',
      deadline: '01-31-2023',
      progress: 0,
      value: 5,
      category: '6564a96a9dfe5e278e57c29e',
      owner: 'someUserId',
    };
    Goal.create.mockResolvedValue(fakeGoal);
    await add(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeGoal);
    expect(Goal.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...req.body,
        owner: 'someUserId',
        category: expect.any(Object),
      }),
    );
  });

  it('update a goal by id and respond with the updated goal', async () => {
    const req = {
      params: { id: 'goalId1' },
      body: { title: 'Updated Goal' },
    };
    const res = {
      json: jest.fn(),
    };
    const fakeUpdatedGoal = {
      _id: 'goalId1',
      title: 'Updated Goal',
    };
    Goal.findByIdAndUpdate.mockResolvedValue(fakeUpdatedGoal);
    await updateById(req, res);
    expect(res.json).toHaveBeenCalledWith(fakeUpdatedGoal);
    expect(Goal.findByIdAndUpdate).toHaveBeenCalledWith('goalId1', req.body, {
      new: true,
    });
  });

  it('mark a goal as deleted by id and respond with the updated goal', async () => {
    const req = {
      params: { id: 'goalId1' },
      body: { title: 'Updated Goal' },
    };
    const res = {
      json: jest.fn(),
    };
    const fakeUpdatedGoal = {
      _id: 'goalId1',
      title: 'Updated Goal',
      deleted: true,
    };
    Goal.findByIdAndUpdate.mockResolvedValue(fakeUpdatedGoal);
    await deleteById(req, res);
    expect(res.json).toHaveBeenCalledWith(fakeUpdatedGoal);
    expect(Goal.findByIdAndUpdate).toHaveBeenCalledWith(
      'goalId1',
      { ...req.body, deleted: true },
      { new: true },
    );
  });

  it('update the status of a goal by id and respond with the updated goal', async () => {
    const req = {
      params: { id: 'goalId1' },
      body: { status: true },
    };
    const res = {
      json: jest.fn(),
    };
    const fakeUpdatedGoal = {
      _id: 'goalId1',
      status: true,
    };
    Goal.findByIdAndUpdate.mockResolvedValue(fakeUpdatedGoal);
    await updateStatus(req, res);
    expect(res.json).toHaveBeenCalledWith(fakeUpdatedGoal);
    expect(Goal.findByIdAndUpdate).toHaveBeenCalledWith('goalId1', req.body, {
      new: true,
    });
  });

  it('get all goals for a specific category and respond with the goals', async () => {
    const req = {
      params: { categoryId: 'someCategoryId' },
    };
    const res = {
      json: jest.fn(),
    };

    const fakeGoals = [
      {
        _id: 'goalId1',
        title: 'Goal 1',
        deleted: false,
        category: 'someCategoryId',
      },
      {
        _id: 'goalId2',
        title: 'Goal 2',
        deleted: false,
        category: 'someCategoryId',
      },
    ];

    Goal.find.mockResolvedValue(fakeGoals);

    await getAllByCategory(req, res);

    expect(res.json).toHaveBeenCalledWith(fakeGoals);
    expect(Goal.find).toHaveBeenCalledWith({
      category: 'someCategoryId',
      deleted: false,
    });
  });
});
