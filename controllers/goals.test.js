const { Types } = require('mongoose');
const { HttpError, ctrlWrapper } = require('../helpers');
const {
  getAll,
  add,
  updateById,
  deleteById,
  updateStatus,
  getAllByCategory,
} = require('./goals');

jest.mock('mongoose');

const mockGoal = {
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
};

jest.mock('mongoose');

jest.mock('../models/goal', () => ({
  Goal: mockGoal,
}));

describe('Goals Controller', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      user: { _id: 'userId' },
      body: {},
      params: {},
    };
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('test getAll function', () => {
    test('should return goals for the authenticated user', async () => {
      const mockGoals = [{ title: 'Goal 1' }, { title: 'Goal 2' }];
      mockGoal.find.mockResolvedValue(mockGoals);

      await getAll(mockReq, mockRes);

      expect(mockGoal.find).toHaveBeenCalledWith({
        deleted: false,
        owner: 'userId',
      });
      expect(mockRes.json).toHaveBeenCalledWith(mockGoals);
    });
  });

  describe('test add function', () => {
    test('should create a new goal and return it', async () => {
      const mockNewGoal = { title: 'New Goal' };
      mockGoal.create.mockResolvedValue(mockNewGoal);

      mockReq.body = { title: 'New Goal', category: 'categoryId' };

      await add(mockReq, mockRes);

      expect(mockGoal.create).toHaveBeenCalledWith({
        title: 'New Goal',
        owner: 'userId',
        category: Types.ObjectId('categoryId'),
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockNewGoal);
    });
  });

  describe('updateById', () => {
    test('should update a goal by ID and return the updated goal', async () => {
      const mockUpdatedGoal = { title: 'Updated Goal' };
      mockGoal.findByIdAndUpdate.mockResolvedValue(mockUpdatedGoal);
      mockReq.params.id = 'goalId';
      mockReq.body = { title: 'Updated Goal' };

      await updateById(mockReq, mockRes);

      expect(mockGoal.findByIdAndUpdate).toHaveBeenCalledWith(
        'goalId',
        { title: 'Updated Goal' },
        { new: true },
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedGoal);
    });

    test('should call next with HttpError(404) if goal with given ID is not found', async () => {
      mockGoal.findByIdAndUpdate.mockResolvedValue(null);
      mockReq.params.id = 'nonexistentId';

      await updateById(mockReq, mockRes, mockNext);

      expect(mockGoal.findByIdAndUpdate).toHaveBeenCalledWith(
        'nonexistentId',
        expect.any(Object),
        { new: true },
      );
      expect(mockNext).toHaveBeenCalledWith(HttpError(404, 'Not found'));
    });
  });

  describe('deleteById', () => {
    test('should soft delete a goal by ID and return the updated goal', async () => {
      // Arrange
      const mockDeletedGoal = { title: 'Deleted Goal', deleted: true };
      mockGoal.findByIdAndUpdate.mockResolvedValue(mockDeletedGoal);
      mockReq.params.id = 'goalId';

      // Act
      await deleteById(mockReq, mockRes);

      // Assert
      expect(mockGoal.findByIdAndUpdate).toHaveBeenCalledWith(
        'goalId',
        { ...mockReq.body, deleted: true },
        { new: true },
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockDeletedGoal);
    });

    test('should call next with HttpError(404) if goal with given ID is not found', async () => {
      // Arrange
      mockGoal.findByIdAndUpdate.mockResolvedValue(null);
      mockReq.params.id = 'nonexistentId';

      // Act
      await deleteById(mockReq, mockRes, mockNext);

      // Assert
      expect(mockGoal.findByIdAndUpdate).toHaveBeenCalledWith(
        'nonexistentId',
        expect.any(Object),
        { new: true },
      );
      expect(mockNext).toHaveBeenCalledWith(HttpError(404, 'Not found'));
    });
  });

  describe('updateStatus', () => {
    test('should update the status of a goal by ID and return the updated goal', async () => {
      // Arrange
      const mockUpdatedGoal = { title: 'Updated Goal', status: 'completed' };
      mockGoal.findByIdAndUpdate.mockResolvedValue(mockUpdatedGoal);
      mockReq.params.id = 'goalId';
      mockReq.body = { status: 'completed' };

      // Act
      await updateStatus(mockReq, mockRes);

      // Assert
      expect(mockGoal.findByIdAndUpdate).toHaveBeenCalledWith(
        'goalId',
        { status: 'completed' },
        { new: true },
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedGoal);
    });

    test('should call next with HttpError(404) if goal with given ID is not found', async () => {
      // Arrange
      mockGoal.findByIdAndUpdate.mockResolvedValue(null);
      mockReq.params.id = 'nonexistentId';

      // Act
      await updateStatus(mockReq, mockRes, mockNext);

      // Assert
      expect(mockGoal.findByIdAndUpdate).toHaveBeenCalledWith(
        'nonexistentId',
        expect.any(Object),
        { new: true },
      );
      expect(mockNext).toHaveBeenCalledWith(HttpError(404, 'Not found'));
    });
  });

  describe('getAllByCategory', () => {
    test('should return goals for a specific category', async () => {
      const mockGoalsByCategory = [{ title: 'Goal 1' }, { title: 'Goal 2' }];
      mockGoal.find.mockResolvedValue(mockGoalsByCategory);
      mockReq.params.categoryId = 'categoryId';

      await getAllByCategory(mockReq, mockRes);

      expect(mockGoal.find).toHaveBeenCalledWith({
        category: 'categoryId',
        deleted: false,
      });
      expect(mockRes.json).toHaveBeenCalledWith(mockGoalsByCategory);
    });
  });
});
