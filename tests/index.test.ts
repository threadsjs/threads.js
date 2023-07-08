import { getToken, Client } from "../index";


describe('getToken', () => {
    let token: string;
    let userName = 'ENTER YOUR USERNAME HERE'
    let userPassword = 'ENTER YOUR PASSWORD HERE'
  
    beforeAll(async () => {
      const username = userName;
      const password = userPassword;
      token = await getToken(username, password);
      expect(token).toBeDefined();
    });
  
    describe('Client', () => {
      let client: Client;
  
      beforeAll(() => {
        client = new Client({ token });
      });
  
      it('should get user information', async () => {
        const userId = userName;
        const user = await client.getUser(userId);
        expect(user).toBeDefined();
        expect(user.id).toBe(userId);
      });
  
      it('should get post information', async () => {
        const postId = 'post-id';
        const post = await client.getPost(postId);
        expect(post).toBeDefined();
        expect(post.id).toBe(postId);
      });
  
      it('should post a thread', async () => {
        const contents = 'This Means HammerTime!';
        const userId = userName;
        const response = await client.postThread(contents, userId);
        console.log(response)
        expect(response).toBeDefined();
        expect(response.success).toBe(true);
      
      });
    });
  
  });
  