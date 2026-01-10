import { MongooseRepository } from './mongoose.repository';
import { Document } from 'mongoose';

// Define a simple mock document type
interface MockDoc extends Document {
  name: string;
}

// Concrete class for testing
class TestRepository extends MongooseRepository<MockDoc> {}

describe('MongooseRepository', () => {
  let repository: TestRepository;
  let mockModel: any;

  beforeEach(() => {
    mockModel = jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    }));

    mockModel.find = jest.fn();
    mockModel.findById = jest.fn();
    mockModel.findOne = jest.fn();
    mockModel.findByIdAndUpdate = jest.fn();
    mockModel.findByIdAndDelete = jest.fn();

    repository = new TestRepository(mockModel);
  });

  describe('create', () => {
    it('should create and save', async () => {
      const item = { name: 'test' };
      const result = await repository.create(item);
      expect(result).toEqual(expect.objectContaining(item));
      expect(mockModel).toHaveBeenCalledWith(item);
    });
  });

  describe('findAll', () => {
    it('should find all with filters and options', async () => {
      const expected = [{ name: 'test' }];
      const mockExec = jest.fn().mockResolvedValue(expected);

      const mockQuery = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: mockExec,
      };
      mockModel.find.mockReturnValue(mockQuery);

      const result = await repository.findAll({}, { skip: 10, limit: 5 });

      expect(result).toBe(expected);
      expect(mockModel.find).toHaveBeenCalled();
      expect(mockQuery.skip).toHaveBeenCalledWith(10);
      expect(mockQuery.limit).toHaveBeenCalledWith(5);
      expect(mockExec).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find by id', async () => {
      const expected = { name: 'test' };
      mockModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(expected),
      });

      const result = await repository.findOne('1');
      expect(result).toBe(expected);
      expect(mockModel.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update by id', async () => {
      const expected = { name: 'updated' };
      mockModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(expected),
      });

      const result = await repository.update('1', { name: 'updated' });
      expect(result).toBe(expected);
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'updated' },
        { new: true },
      );
    });
  });

  describe('delete', () => {
    it('should delete by id', async () => {
      mockModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ name: 'deleted' }),
      });

      const result = await repository.delete('1');
      expect(result).toBe(true);
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});
