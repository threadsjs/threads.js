"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('getToken', () => {
    let token;
    let userName = 'ENTER YOUR USERNAME HERE';
    let userPassword = 'ENTER YOUR PASSWORD HERE';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const username = userName;
        const password = userPassword;
        token = yield (0, index_1.getToken)(username, password);
        expect(token).toBeDefined();
    }));
    describe('Client', () => {
        let client;
        beforeAll(() => {
            client = new index_1.Client({ token });
        });
        it('should get user information', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = userName;
            const user = yield client.getUser(userId);
            expect(user).toBeDefined();
            expect(user.id).toBe(userId);
        }));
        it('should get post information', () => __awaiter(void 0, void 0, void 0, function* () {
            const postId = 'post-id';
            const post = yield client.getPost(postId);
            expect(post).toBeDefined();
            expect(post.id).toBe(postId);
        }));
        it('should post a thread', () => __awaiter(void 0, void 0, void 0, function* () {
            const contents = 'This Means HammerTime!';
            const userId = userName;
            const response = yield client.postThread(contents, userId);
            console.log(response);
            expect(response).toBeDefined();
            expect(response.success).toBe(true);
        }));
    });
});
