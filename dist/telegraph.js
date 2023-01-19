"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telegraph = void 0;
var node_fetch_1 = require("node-fetch");
/**
 * This single important class helps you to create
 * [Telegra.ph](https://telegra.ph) account instances and create pages (posts)
 * through them.
 *
 * With an account instance, you can create posts so easily! For example,
 * ```ts
 * // Create a Telegra.ph account.
 * const tph = new Telegraph({
 *    // Only `short_name` is required to
 *    // create an account.
 *    short_name: "Gary",
 *    // However, you can pass in the rest
 *    // as optional parameters,
 *    author_name: "Gary J. Franco",
 *    author_url: "https://telegra.ph/",
 * });
 * ```
 *
 * You can also connect to an existing account by passing in the `accessToken`.
 * ```ts
 * // Create a Telegra.ph account.
 * const tph = new Telegraph({
 *    accessToken: "XXXXXXXXXXX", // Keep your `accessToken` private, boys!
 * });
 * ```
 *
 * Wow, cool! You know something more cool? Connect to an existing account but
 * also change the details of it.
 * ```ts
 * // Create a Telegra.ph account.
 * const tph = new Telegraph({
 *    accessToken: "XXXXXXXXXXX", // Existing account's access_token.
 *    // Hmm, I didn't like the old name, let's change it.
 *    short_name: "Bob", // This will change the account's short name to "Bob".
 *    // Don't forget to call `setupAccount`.
 *    // You can also change `author_name` and `author_url` as well.
 * });
 * ```
 *
 * Now that you have created an instance of Telegraph, let's move on.
 *
 * Call `setupAccount` before you do any other operations with your account.
 * But, if you are only passing in `accessToken` as options, you don't have to
 * call this.
 * ```ts
 * await tph.setupAccount();
 * ```
 *
 * Now that you have connected your account, you can call any methods with the
 * required arguments! Try calling this:
 *
 * ```ts
 * const post = await tph.create({
 *    title: "My first post using Tph's Deno API wrapper",
 *    content: "Yoohooo! This is my first post created using Telegraph's Deno API wrapper.",
 * });
 * // The `post` constant contains all the
 * // available details of your fresh post!
 * // Try logging the URL to console.
 * console.log(post.url);
 * ```
 *
 * Read the JSDocs or the official documentation on GitHub to find out more
 * about all methods and their usage.
 */
var Telegraph = /** @class */ (function () {
    /**
     * Currently, you can pass in the values in 3 different ways.
     *
     * - **Creating a new account**
     *
     * ```ts
     * const tph = new Telegraph({
     *     // Only `short_name` is required to
     *     // create an account.
     *     short_name: "Gary",
     *     // However, you can pass in the rest
     *     // as optional parameters,
     *     author_name: "Gary J. Franco",
     *     author_url: "https://telegra.ph/",
     * });
     *
     * // To actually setup (create) an account.
     * await tph.setupAccount();
     * ```
     *
     * - **Connecting to an existing account**
     *
     * ```ts
     * // Create a Telegra.ph account.
     * const tph = new Telegraph({
     *    accessToken: "XXXXXXXXXXX", // Keep your `accessToken` private, boys!
     * });
     *
     * // You don't need to call `setupAccount` here.
     * ```
     * - **Connecting to an account and changing the account info**
     *
     * ```ts
     * // Create a Telegra.ph account.
     * const tph = new Telegraph({
     *    accessToken: "XXXXXXXXXXX", // Existing account's access_token.
     *    // Update `short_name` to "Snoopy"
     *    short_name: "Snoopy",
     *    // Don't forget to call `setupAccount`.
     *    // You can also change `author_name` and `author_url` as well.
     * });
     *
     * // To update and connect to the account.
     * await tph.setupAccount();
     * ```
     *
     * @param config Values required for creating or connecting a Telegra.ph
     * account. Pass in required values as the docs says.
     */
    function Telegraph(config) {
        this.API_ROOT = "https://api.telegra.ph/";
        this.accessToken = "";
        if (config.accessToken)
            this.accessToken = config.accessToken;
        if (config.apiRoot)
            this.API_ROOT = config.apiRoot;
        this.config = config;
        if (!config.accessToken && !config.short_name) {
            throw new Error("No valid input were provided to create or connect a Telegraph account.");
        }
    }
    Object.defineProperty(Telegraph.prototype, "token", {
        /** Access token of the account */
        get: function () {
            return this.accessToken;
        },
        set: function (value) {
            this.accessToken = this.config.accessToken = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates or creates a Telegraph account and assigns the access token to the
     * account instance.
     *
     * ```ts
     * await tph.setupAccount();
     * ```
     *
     * You have to call this method if you haven't passed `accessToken` to create
     * an account **or**, if you have provided something with `accessToken` for
     * updating the existing account -- while creating an account instance.
     * @returns Information about the connected account.
     */
    Telegraph.prototype.setupAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.config.accessToken && (this.config.author_name || this.config.author_url || this.config.short_name))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.editAccount(this.config)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(!this.config.accessToken && !this.accessToken && this.config.short_name)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.createAccount({
                                short_name: this.config.short_name,
                                author_name: this.config.author_name,
                                author_url: this.config.author_url,
                            })];
                    case 3:
                        account = _a.sent();
                        this.token = account.access_token;
                        return [2 /*return*/, account];
                    case 4: return [4 /*yield*/, this.getAccount()];
                    case 5: 
                    // If just access token.
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Requests a API method with access token.
     * @param method API method.
     * @param payload Body of the API call.
     * @returns Result of the API call.
     */
    Telegraph.prototype.request = function (method, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.API_ROOT + method;
                        return [4 /*yield*/, (0, node_fetch_1.default)(url, {
                                method: "POST",
                                headers: { "content-type": "application/json" },
                                body: JSON.stringify(__assign({ access_token: this.accessToken }, payload)),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = (_a.sent());
                        if (!json.ok) {
                            throw new Error(json.error);
                        }
                        return [2 /*return*/, json.result];
                }
            });
        });
    };
    /**
     * Creates a Telegraph account and returns the details of the new account.
     * Remember to store the `access_token`, of the account.
     *
     * It also returns a URL to authorize a browser on telegra.ph and connect it
     * to a Telegraph account. This URL is valid for only one use and for 5
     * minutes only.
     *
     * Read more: https://telegra.ph/api#createAccount
     *
     * ```ts
     * const account = await tph.createAccount({
     *    short_name: "Aaron",
     *    author_name: "Aaron Blake",
     *    author_url: "https://randomwordgenerator.com/name.php",
     * });
     * ```
     *
     * @param options Details of the account you want to create. Only `short_name`
     * is required.
     * @returns "On success, returns an Account object with the regular fields and
     * an additional access_token field".
     */
    Telegraph.prototype.createAccount = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("createAccount", options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update information about the account. Pass only the parameters that you
     * want to edit. At least one of them is required.
     *
     * Read more: https://telegra.ph/api#editAccountInfo
     *
     * ```ts
     * const account = await tph.editAccount({
     *    short_name: "James",
     *    author_name: "Aaron James Blake",
     *    author_url: "https://randomwordgenerator.com/name.php",
     * });
     * ```
     *
     * @param options Information of the account you want to edit. At least one of
     * them is required.
     * @returns On success, returns an Account object with the `short_name`,
     * `author_name` (if there is) and `author_url` (if there is) fields.
     */
    Telegraph.prototype.editAccount = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("editAccountInfo", options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Use this method to get information about the account.
     *
     * You can specify the list of account fields to return. Available fields are
     * `short_name`, `author_name`, `author_url`, `auth_url` and `page_count`.
     *
     * Read more: https://telegra.ph/api#getAccountInfo
     *
     * By default it fetches all fields.
     *
     * ```ts
     * // Default: All details.
     * await tph.getAccount();
     * // `author_name` only.
     * await tph.getAccount(["author_name"]);
     * // Basic details.
     * await tph.getAccount([
     *  "short_name",
     *  "author_name",
     *  "author_url"
     * ]);
     * ```
     *
     * @param fields The List of account fields to return. Available fields:
     * `short_name`, `author_name`, `author_url`, `auth_url` and `page_count`.
     * @returns Account object with the requested fields on success.
     */
    Telegraph.prototype.getAccount = function (fields) {
        if (fields === void 0) { fields = ["short_name", "author_name", "author_url", "auth_url", "page_count"]; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("getAccountInfo", {
                            fields: fields,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Use this method to revoke `access_token` and generate a new one. For
     * example, if the you would like to reset all connected sessions, or you have
     * reasons to believe the token was compromised.
     *
     * Passing the argument `true` or just leaving it empty, revokes the
     * `access_token` and sets the new one to the connected account. And that
     * `access_token` will be used when calling methods later on.
     *
     * Read more: https://telegra.ph/api#revokeAccessToken
     *
     * ```ts
     * await tph.revokeAccessToken();
     * ```
     *
     * By passing `false`, it only revokes the `access_token`. You have to store
     * the returned `access_token`, if you want to do something with the account
     * later.
     *
     * ```ts
     * await tph.revokeAccessToken(false);
     * ```
     *
     * Or set yourself manually later at some point like,
     * ```ts
     * const { access_token } = await tph.revokeAccessToken(false);
     * // When you are done with your things,
     * tph.token = access_token;
     * ```
     *
     * @param save Whether you wanna save the new `access_token` to the account or
     * not. Defaults to `true`. Set to `false` if you don't want to update it.
     * @returns On success, returns new `access_token` and `auth_url` for the
     * account.
     */
    Telegraph.prototype.revokeAccessToken = function (save) {
        if (save === void 0) { save = true; }
        return __awaiter(this, void 0, void 0, function () {
            var accountCreds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("revokeAccessToken")];
                    case 1:
                        accountCreds = _a.sent();
                        if (save)
                            this.token = accountCreds.access_token;
                        return [2 /*return*/, accountCreds];
                }
            });
        });
    };
    /**
     * Use this method to create a new Telegraph page from the account.
     *
     * Read more: https://telegra.ph/api#createPage
     *
     * `title` and `content` are required. `author_name`, `author_url`,
     * `return_content` are optionals.
     *
     * ```ts
     * await tph.create({
     *    title: "Telegraph is cool!",
     *    // See down below for more content types.
     *    content: "I <3 Telegra.ph!",
     *    // Not required.
     *    author_name: "Telegram",
     *    author_url: "https://telegram.org",
     *    return_content: true,
     * });
     * ```
     *
     * Content can be **Markdown**, **HTML**, just **String** or **Array of
     * strings** or **[Node](https://telegra.ph/api#Node)** or an Array of both
     * strings and Nodes. To use HTML and Markdown you need to import 2 parser
     * functions from this module.
     *
     * ```ts
     * import { parseHtml, parseMarkdown } from "https://deno.land/x/telegraph/mod.ts";
     * ```
     *
     * Here are basic examples for each type. See the README of the official
     * Repository to find more of them.
     *
     * ```ts
     * const content = "With just a string";
     * const content = [ "Array of strings.", " I am number one." ];
     * ```
     *
     * **HTML**, `parseHtml(htmlContent)` will convert the HTML string to Node.
     * ```ts
     * const content = parseHtml(`<h1>Pure HTML, boys</h1> <br>
     * <p><b>Be bold</b></p>`);
     * ```
     *
     * **Markdown**, `parseMarkdown(mdContent)` will parse the Markdown down to
     * Node for the content.
     *
     * ```ts
     * const content = parseMarkdown(`## Heading 2\n\nThis is so **cool**!`);
     * ```
     *
     * **Node**, bit complicated one to create (That's why MD and HTML methods
     * exists), if there is a lot of formatting and all.
     *
     * ```ts
     * const content = [
     *   {
     *     tag: "a", // Specifies the tag.
     *     attrs: {
     *       href: "https://github.com", // Attributes supports `href` and `src`.
     *     },
     *     children: ["GitHub"], // Children can be another Node, parsed HTML, parsed MD, strings.
     *   },
     *   {
     *     tag: "br", // Line break
     *   },
     *   {
     *     tag: "p", // Paragraph
     *     children: [
     *       "GitHub is where over 73 million developers shape the future of software, together.",
     *     ],
     *   },
     *   {
     *     tag: "img", // Image
     *     attrs: { // Attributes supports `href` and `src`.
     *       src: "https://github.githubassets.com/images/modules/site/social-cards/github-social.png",
     *     },
     *   },
     * ];
     * ```
     *
     * @param options Options to create the page. Only `title` and `content` is
     * required.
     * @returns On success, returns a `Page` object with all the details of the
     * page you just created.
     */
    Telegraph.prototype.create = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof options.content === "string") {
                            options.content = [options.content];
                        }
                        return [4 /*yield*/, this.request("createPage", options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Use this method to edit an existing Telegraph page.
     *
     * Read more: https://telegra.ph/api#editPage
     *
     * Only `content` is required. All other params are optional.
     *
     * ```ts
     * await tph.edit("Telegrapphs-i-Cool-12-31", {
     *    // See down below for more content types.
     *    content: "I <3 <3 Telegra.ph!",
     *    // Not required.
     *    title: "Telegraph is cool!",
     *    author_name: "Telegram",
     *    author_url: "https://telegram.org",
     *    return_content: true,
     * });
     * ```
     *
     * Content can be **Markdown**, **HTML**, just **String** or **Array of
     * strings** or **[Node](https://telegra.ph/api#Node)** or an Array of both
     * strings and Nodes. To use HTML and Markdown you need to import 2 parser
     * functions from this module.
     *
     * ```ts
     * import { parseHtml, parseMarkdown } from "https://deno.land/x/telegraph/mod.ts";
     * ```
     *
     * Here are basic examples for each type. See the README of the official
     * Repository to find more of them.
     *
     * ```ts
     * const content = "With just a string";
     * const content = [ "Array of strings.", " I am number one." ];
     * ```
     *
     * **HTML**, `parseHtml(htmlContent)` will convert the HTML string to Node.
     * ```ts
     * const content = parseHtml(`<h1>Pure HTML, boys</h1> <br>
     * <p><b>Be bold</b></p>`);
     * ```
     *
     * **Markdown**, `parseMarkdown(mdContent)` will parse the Markdown down to
     * Node for the content.
     *
     * ```ts
     * const content = parseMarkdown(`## Heading 2\n\nThis is so **cool**!`);
     * ```
     *
     * **Node**, bit complicated one to create (That's why MD and HTML methods
     * exists), if there is a lot of formatting and all.
     *
     * ```ts
     * const content = [
     *   {
     *     tag: "a", // Specifies the tag.
     *     attrs: {
     *       href: "https://github.com", // Attributes supports `href` and `src`.
     *     },
     *     children: ["GitHub"], // Children can be another Node, parsed HTML, parsed MD, strings.
     *   },
     *   {
     *     tag: "br", // Line break
     *   },
     *   {
     *     tag: "p", // Paragraph
     *     children: [
     *       "GitHub is where over 73 million developers shape the future of software, together.",
     *     ],
     *   },
     *   {
     *     tag: "img", // Image
     *     attrs: { // Attributes supports `href` and `src`.
     *       src: "https://github.githubassets.com/images/modules/site/social-cards/github-social.png",
     *     },
     *   },
     * ];
     * ```
     *
     * @param path Path to the post (page) you want to edit the title, properties,
     * content. Paths are the string comes after "https://telegra.ph/".
     *
     * For example, `Telegraph-is-cool-12-24` is the path. Original URL:
     * `https://telegra.ph/Telegraph-is-cool-12-24`
     * @param options The fields you want to edit, just like the options of
     * Creating a post. But only `content` is required, all other fields are
     * optional.
     * @returns
     */
    Telegraph.prototype.edit = function (path, options) {
        return __awaiter(this, void 0, void 0, function () {
            var title;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!options.title) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.get(path)];
                    case 1:
                        title = (_a.sent()).title;
                        options.title = title;
                        _a.label = 2;
                    case 2:
                        if (typeof options.content === "string") {
                            options.content = [options.content];
                        }
                        return [2 /*return*/, this.request("editPage", __assign({ path: path }, options))];
                }
            });
        });
    };
    /**
     * Use this method to get a Telegraph page.
     *
     * Read more: https://telegra.ph/api#getPage
     *
     * Get page details without the content.
     *
     * ```ts
     * await tph.get("Telegraph-is-cool-12-24");
     * ```
     *
     * Get a page details including the content.
     *
     * ```ts
     * await tph.get("Telegraph-is-cool-12-24", true);
     * ```
     *
     * @param path Path to the Telegraph page (in the format Title-12-31, i.e.
     * everything that comes after `http://telegra.ph/`).
     * @param returnContent If `true`, content field will be returned in `Page`
     * object. Defaults to `false`.
     * @returns On success, returns a `Page` object with the details of the
     * requested page.
     */
    Telegraph.prototype.get = function (path, returnContent) {
        if (returnContent === void 0) { returnContent = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("getPage", {
                            path: path,
                            return_content: returnContent,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Use this method to get a list of pages belonging to the account. Returns a
     * PageList object, sorted by most recently created pages first.
     *
     * Read more: https://telegra.ph/api#getPageList
     *
     * Get all pages belonging to the connected account.
     *
     * ```ts
     * tph.getPages();
     * ```
     *
     * To get 2nd and 3rd last created pages,
     *
     * ```ts
     * tph.getPages({
     *   offset: 1,
     *   limit: 2,
     * });
     * ```
     *
     * @param options Offset and limit of the pages to be returned.
     *
     * - `offset` - Sequential number of the first page to be returned.
     * - `limit` - Number of pages to be returned.
     * @returns Returns a PageList object, sorted by most recently created pages
     * first.
     */
    Telegraph.prototype.getPages = function (options) {
        if (options === void 0) { options = { limit: 50, offset: 0 }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("getPageList", options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Use this method to get the number of views for a Telegraph article.
     *
     * Read more: https://telegra.ph/api#getViews
     *
     * ```ts
     * tph.getPageViews("Telegraph-is-cool-12-24");
     * // { views: 0 }
     * // View count of the year 2021?
     * tph.getPageViews({ year: 2021 });
     * // View count of 3PM of December 24th of year 2021.
     * tph.getPageViews({
     *   // Optional. 0 to 24.
     *   hour: 15,
     *   // Required if `hour` is passed. 1 to 31.
     *   day: 24,
     *   // Required if `day` is passed. 1 to 12.
     *   month: 12,
     *   // Required if `month` is passed. 2000 to 2100.
     *   year: 2021,
     * });
     * ```
     *
     * @param path Path to the post (page) which you want to get the views. Paths
     * are the string comes after "https://telegra.ph/".
     *
     * For example, `Telegraph-is-cool-12-24` is the path. Original URL:
     * `https://telegra.ph/Telegraph-is-cool-12-24`
     * @param options All are optionals. `hour` (Optional. 0 to 24), `day`
     * (Required if `hour` is passed. 1 to 31), `month` (Required if `day` is
     * passed. 1 to 12), and `year` (Required if `month` is passed. 2000 to 2100)
     * @returns Number of views `{ "views": 0 }`
     * ```
     */
    Telegraph.prototype.getPageViews = function (path, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("getViews", __assign({ path: path }, options))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Telegraph;
}());
exports.Telegraph = Telegraph;
