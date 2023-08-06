const { addUser } = require("../controller/registration.controller"); // Replace with the actual path
const { Registertion } = require("../sequelize"); // Replace with the actual path to your model
const passwordHash = require("password-hash"); // Assuming you're using a password hashing library

// Mocking the Registration model and passwordHash library
jest.mock("../sequelize", () => ({
  findAll: jest.fn(),
}));

jest.mock("password-hash", () => ({
  generate: jest.fn((password) => `hashed_${password}`),
}));

describe("addUser function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new user when provided valid input", (done) => {
    const inputBody = {
      email: "test@example.com",
      password: "testPassword",
      cpassword: "testPassword",
    };

    const mockedFindAll = jest.fn(() => Promise.resolve([]));
    Registertion.findAll.mockImplementationOnce(mockedFindAll);

    const mockedSave = jest.fn(() =>
      Promise.resolve({ savedUser: "userObject" })
    );
    const mockedDone = jest.fn((error, result) => {
      expect(error).toBeNull();
      expect(result).toEqual({ savedUser: "userObject" });
      expect(mockedSave).toHaveBeenCalledTimes(1);
      expect(mockedSave).toHaveBeenCalledWith();
      expect(passwordHash.generate).toHaveBeenCalledWith("testPassword");
      done();
    });

    const originalAddUser = addUser;
    addUser(inputBody, mockedDone);

    expect(mockedFindAll).toHaveBeenCalledTimes(1);
    expect(mockedFindAll).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });

    return Promise.resolve().then(() => {
      expect(mockedSave).toHaveBeenCalledTimes(1);
      expect(mockedSave).toHaveBeenCalledWith();
    });
  });

  it("should return an error when email already exists", (done) => {
    const inputBody = {
      email: "test@example.com",
      password: "testPassword",
      cpassword: "testPassword",
    };

    const mockedFindAll = jest.fn(() =>
      Promise.resolve([{ existingUser: "userObject" }])
    );
    Registertion.findAll.mockImplementationOnce(mockedFindAll);

    const mockedDone = jest.fn((error, result) => {
      expect(error).toBe("This email is already exist");
      expect(result).toBeNull();
      expect(mockedFindAll).toHaveBeenCalledTimes(1);
      expect(mockedFindAll).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      done();
    });

    const originalAddUser = addUser;
    addUser(inputBody, mockedDone);

    return Promise.resolve().then(() => {
      // No further calls expected
    });
  });

  it("should return an error when passwords do not match", (done) => {
    const inputBody = {
      email: "test@example.com",
      password: "testPassword",
      cpassword: "differentPassword",
    };

    const mockedFindAll = jest.fn(() => Promise.resolve([]));
    Registertion.findAll.mockImplementationOnce(mockedFindAll);

    const mockedDone = jest.fn((error, result) => {
      expect(error).toBe("Confirm Password does not match");
      expect(result).toBeNull();
      expect(mockedFindAll).toHaveBeenCalledTimes(1);
      expect(mockedFindAll).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      done();
    });

    const originalAddUser = addUser;
    addUser(inputBody, mockedDone);

    return Promise.resolve().then(() => {
      // No further calls expected
    });
  });

  it("should handle error during user registration", (done) => {
    const inputBody = {
      email: "test@example.com",
      password: "testPassword",
      cpassword: "testPassword",
    };

    const mockedFindAll = jest.fn(() => Promise.resolve([]));
    Registertion.findAll.mockImplementationOnce(mockedFindAll);

    const mockedSave = jest.fn(() => Promise.reject("Registration error"));
    const mockedDone = jest.fn((error, result) => {
      expect(error).toBe("Registration error");
      expect(result).toBeNull();
      expect(mockedSave).toHaveBeenCalledTimes(1);
      expect(mockedSave).toHaveBeenCalledWith();
      done();
    });

    const originalAddUser = addUser;
    addUser(inputBody, mockedDone);

    expect(mockedFindAll).toHaveBeenCalledTimes(1);
    expect(mockedFindAll).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });

    return Promise.resolve().then(() => {
      expect(mockedSave).toHaveBeenCalledTimes(1);
      expect(mockedSave).toHaveBeenCalledWith();
    });
  });

  it("should handle error during email existence check", (done) => {
    const inputBody = {
      email: "test@example.com",
      password: "testPassword",
      cpassword: "testPassword",
    };

    const mockedFindAll = jest.fn(() =>
      Promise.reject("Email existence check error")
    );
    Registertion.findAll.mockImplementationOnce(mockedFindAll);

    const mockedDone = jest.fn((error, result) => {
      expect(error).toBe("Email existence check error");
      expect(result).toBeNull();
      expect(mockedFindAll).toHaveBeenCalledTimes(1);
      expect(mockedFindAll).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      done();
    });

    const originalAddUser = addUser;
    addUser(inputBody, mockedDone);

    expect(mockedFindAll).toHaveBeenCalledTimes(1);
    expect(mockedFindAll).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });

    return Promise.resolve().then(() => {
      // No further calls expected
    });
  });
});
