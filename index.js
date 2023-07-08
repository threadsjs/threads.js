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
exports.Client = exports.getToken = void 0;
//index.ts
const undici_1 = require("undici");
const events_1 = require("events");
function getToken(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (Math.random() * 1e24).toString(36);
        const url = "https://i.instagram.com/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/";
        const params = {
            client_input_params: {
                password,
                contact_point: username,
                device_id: `android-${id}`,
            },
            server_params: {
                credential_type: "password",
                device_id: `android-${id}`,
            },
        };
        const bkClientContext = {
            bloks_version: "5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73",
            styles_id: "instagram",
        };
        const requestBody = {
            params: JSON.stringify(params),
            bk_client_context: JSON.stringify(bkClientContext),
            bloks_versioning_id: "5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73",
        };
        const requestOptions = {
            method: "POST",
            headers: {
                "User-Agent": "Barcelona 289.0.0.77.109 Android",
                "Sec-Fetch-Site": "same-origin",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: `params=${encodeURIComponent(requestBody.params)}&bk_client_context=${encodeURIComponent(requestBody.bk_client_context)}&bloks_versioning_id=${requestBody.bloks_versioning_id}`,
        };
        const response = yield (0, undici_1.fetch)(url, requestOptions);
        const text = yield response.text();
        const pos = text.search("Bearer IGT:2:");
        const token = text.substring(pos + 13, pos + 177);
        return token;
    });
}
exports.getToken = getToken;
class Client extends events_1.EventEmitter {
    constructor({ token, userAgent, appId }) {
        super({ captureRejections: true });
        if (!token) {
            throw new Error("Token is required.");
        }
        this.token = token;
        this.userAgent = userAgent || "Barcelona 289.0.0.77.109 Android";
        this.appId = appId || "238260118697367";
    }
    getLsd() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://www.threads.net/@instagram";
            const requestOptions = {
                method: "GET",
            };
            const response = yield (0, undici_1.fetch)(url, requestOptions);
            const text = yield response.text();
            const pos = text.search('"token"');
            const end = text.substring(pos).search('"');
            const lsd = text.substring(pos + 9, end - 1);
            return lsd;
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://i.instagram.com/api/v1/users/${userId}/info`;
            const requestOptions = {
                headers: {
                    "User-Agent": this.userAgent,
                    Authorization: `Bearer IGT:2:${this.token}`,
                },
            };
            const response = yield (0, undici_1.fetch)(url, requestOptions);
            const user = yield response.json();
            return user;
        });
    }
    getPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lsd = yield this.getLsd();
            const url = "https://www.threads.net/api/graphql";
            const requestBody = {
                lsd,
                variables: JSON.stringify({ postID: postId }),
                doc_id: "5587632691339264",
            };
            const requestOptions = {
                method: "POST",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-IG-App-ID": this.appId,
                    "X-FB-LSD": lsd,
                    "Sec-Fetch-Site": "same-origin",
                },
                body: `lsd=${requestBody.lsd}&variables=${encodeURIComponent(requestBody.variables)}&doc_id=${requestBody.doc_id}`,
            };
            const response = yield (0, undici_1.fetch)(url, requestOptions);
            return yield response.json();
        });
    }
    postThread(contents, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (Math.random() * 1e24).toString(36);
            const url = "https://i.instagram.com/api/v1/media/configure_text_only_post/";
            const requestBody = {
                publish_mode: "text_post",
                text_post_app_info: '{"reply_control":0}',
                timezone_offset: "-25200",
                source_type: "4",
                _uid: userId,
                device_id: `android-${id}`,
                caption: contents,
                device: {
                    manufacturer: "OnePlus",
                    model: "ONEPLUS+A3010",
                    android_version: 25,
                    android_release: "7.1.1",
                },
            };
            const requestOptions = {
                method: "POST",
                headers: {
                    "User-Agent": this.userAgent,
                    Authorization: `Bearer IGT:2:${this.token}`,
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Sec-Fetch-Site": "same-origin",
                },
                body: `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(requestBody))}`,
            };
            const response = yield (0, undici_1.fetch)(url, requestOptions);
            return yield response.json();
        });
    }
}
exports.Client = Client;
