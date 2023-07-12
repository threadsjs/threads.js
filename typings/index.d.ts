declare module "@threadsjs/threads.js/src/managers/RESTManager.js" {
	import { Client } from "@threadsjs/threads.js";
	export default class RESTManager {
		public constructor(client: Client);
		request(url: string, options?: object): Promise<any>;
	}
}

declare module "@threadsjs/threads.js/src/managers/FeedManager.js" {
	import RESTManager from "@threadsjs/threads.js/src/managers/RESTManager.js";
	export default class FeedManager extends RESTManager {
		fetch(max_id?: string): Promise<any>;
		fetchThreads(user: string | number, max_id?: string): Promise<any>;
		fetchReplies(user: string | number, max_id?: string): Promise<any>;
		recommended(paging_token?: number): Promise<any>;
		notifications(filter?: NotificationFilter, pagination?: NotificationPagination): Promise<any>;
		notificationseen(): Promise<any>;
	}
}

declare module "@threadsjs/threads.js/src/managers/PostManager.js" {
	import RESTManager from "@threadsjs/threads.js/src/managers/RESTManager.js";
	export interface CreateOptions {
		content: string;
		data?: null | Object;
	}

	export interface ReplyOptions {
		content: string;
		post: string;
	}

	export default class PostManager extends RESTManager {
		fetch(post: string, paging_token?: string) : Promise<any>;
		likers(post: string, user: string | number) : Promise<any>;
		create(contents: string, user: string | number) : Promise<any>;
		reply(contents: string, user: string | number, post: string): Promise<any>;
		quote(contents: string, user: string | number, post: string): Promise<any>;
		delete(post: string, user: string | number): Promise<any>;
		like(post: string, user: string | number) : Promise<any>;
		unlike(post: string, user: string | number) : Promise<any>;
		repost(post: string) : Promise<any>;
		unrepost(post: string) : Promise<any>;
		embed(url: string) : Promise<any>;
	}
}

declare module "@threadsjs/threads.js/src/managers/UserManager.js" {
	import RESTManager from "@threadsjs/threads.js/src/managers/RESTManager.js";
	import { User, FriendshipStatus } from "@threadsjs/threads.js";
	export default class UserManager extends RESTManager {
		fetch(user: string | number): Promise<User>;
		show(user: string | number): Promise<FriendshipStatus>;
		follow(user: string | number): Promise<FriendshipStatus>;
		unfollow(user: string | number): Promise<FriendshipStatus>;
		search(query: string, count?: number | string): Promise<any>;
		followers(user: string | number): Promise<any>;
		following(user: string | number): Promise<any>;
		mute(user: string | number): Promise<any>;
		unmute(user: string | number): Promise<any>;
		restrict(user: string | number): Promise<any>;
		unrestrict(user: string | number): Promise<any>;
		block(user: string | number): Promise<any>;
		unblock(user: string | number): Promise<any>;
	}
}

declare module "@threadsjs/threads.js" {
	import { EventEmitter } from "node:events";
	import RESTManager from "@threadsjs/threads.js/src/managers/RESTManager.js";
	import FeedManager from "@threadsjs/threads.js/src/managers/FeedManager.js";
	import PostManager from "@threadsjs/threads.js/src/managers/PostManager.js";
	import UserManager from "@threadsjs/threads.js/src/managers/UserManager.js";

	export class Client extends EventEmitter {
		public constructor(options: ClientOptions);

		token: string;
		userAgent: string;
		appId: string;
		androidId: string;
		userId: string;
		base: string;

		rest: RESTManager;
		users: UserManager;
		posts: PostManager;
		feeds: FeedManager;

		public login(username: string, password: string): Promise<void>;
	}

	export interface ClientOptions {
		token?: string;
		userAgent?: string;
		appId?: string;
	}

	export class Base {
		status: "ok" | "fail";
	}

	export class User extends Base {
		user: UserObject;
	}

	export class UserObject {
		has_anonymous_profile_picture: boolean;
		is_supervision_features_enabled: boolean;
		is_new_to_instagram: boolean;
		follower_count: number;
		media_count: number;
		following_count: number;
		following_tag_count: number;
		can_use_affiliate_partnership_messaging_as_creator: boolean;
		can_use_affiliate_partnership_messaging_as_brand: boolean;
		has_collab_collections: boolean;
		has_private_collections: boolean;
		bio_interests: Interests;
		has_music_on_profile: boolean;
		is_potential_business: boolean;
		page_id: number;
		page_name: string;
		ads_page_id: number;
		ads_page_name: string;
		can_use_branded_content_discovery_as_creator: boolean;
		can_use_branded_content_discovery_as_brand: boolean;
		fan_club_info: FanClub;
		fbid_v2: string;
		pronouns: any[];
		is_eligible_for_diverse_owned_business_info: boolean;
		is_eligible_to_display_diverse_owned_business_info: boolean;
		is_whatsapp_linked: boolean;
		transparency_product_enabled: boolean;
		account_category: string;
		interop_messaging_user_fbid: number;
		bio_links: BioLink[];
		can_add_fb_group_link_on_profile: boolean;
		external_url: string;
		show_shoppable_feed: boolean;
		merchant_checkout_style: string;
		seller_shoppable_feed_type: string;
		creator_shopping_info: CreatorShoppingInfo;
		has_guides: boolean;
		has_highlight_reels: boolean;
		hd_profile_pic_url_info: ProfilePicture;
		hd_profile_pic_versions: ProfilePicture[];
		is_interest_account: boolean;
		is_favorite: boolean;
		is_favorite_for_stories: boolean;
		is_favorite_for_igtv: boolean;
		is_favorite_for_clips: boolean;
		is_favorite_for_highlights: boolean;
		live_subscription_status: string;
		is_bestie: boolean;
		usertags_count: number;
		total_ar_effects: number;
		total_clips_count: number;
		has_videos: boolean;
		total_igtv_videos: number;
		has_igtv_series: boolean;
		biography: string;
		include_direct_blacklist_status: boolean;
		biography_with_entities: BiographyWithEntities;
		show_fb_link_on_profile: boolean;
		primary_profile_link_type: number;
		can_hide_category: boolean;
		can_hide_public_contacts: boolean;
		should_show_category: boolean;
		category_id: number;
		is_category_tappable: boolean;
		should_show_public_contacts: boolean;
		is_eligible_for_smb_support_flow: boolean;
		is_eligible_for_lead_center: boolean;
		is_experienced_advertiser: boolean;
		lead_details_app_id: string;
		is_business: boolean;
		professional_conversion_suggested_account_type: number;
		account_type: number;
		direct_messaging: string;
		instagram_location_id: number;
		address_street: string;
		business_contact_method: string;
		city_id: number;
		city_name: string;
		contact_phone_number: string;
		is_profile_audio_call_enabled: boolean;
		latitude: number;
		longitude: number;
		public_email: string;
		public_phone_country_code: string;
		public_phone_number: string;
		zip: string;
		mutual_followers_count: number;
		has_onboarded_to_text_post_app: boolean;
		show_text_post_app_badge: boolean;
		show_ig_app_switcher_badge: boolean;
		show_text_post_app_switcher_badge: boolean;
		profile_context: string;
		profile_context_links_with_user_ids: any[];
		profile_context_facepile_users: any[];
		has_chaining: boolean;
		pk: string;
		pk_id: string;
		username: string;
		full_name: string;
		is_private: boolean;
		follow_friction_type: number;
		is_verified: boolean;
		profile_pic_id: string;
		profile_pic_url: string;
		current_catalog_id: any | null;
		mini_shop_seller_onboarding_status: any | null;
		shopping_post_onboard_nux_type: any | null;
		ads_incentive_expiration_date: any | null;
		displayed_action_button_partner: any | null;
		smb_delivery_partner: any | null;
		smb_support_delivery_partner: any | null;
		displayed_action_button_type: string;
		smb_support_partner: any | null;
		is_call_to_action_enabled: boolean;
		num_of_admined_pages: any | null;
		category: string;
		account_badges: any[];
		highlight_reshare_disabled: boolean;
		auto_expand_chaining: any | null;
		feed_post_reshare_disabled: boolean;
		robi_feedback_source: any | null;
		is_memorialized: boolean;
		open_external_url_with_in_app_browser: boolean;
		has_exclusive_feed_content: boolean;
		has_fan_club_subscriptions: boolean;
		pinned_channels_info: PinnedChannels;
		nametag: any | null;
		remove_message_entrypoint: boolean;
		show_account_transparency_details: boolean;
		existing_user_age_collection_enabled: boolean;
		show_post_insights_entry_point: boolean;
		has_public_tab_threads: boolean;
		third_party_downloads_enabled: number;
		is_regulated_c18: boolean;
		is_in_canada: boolean;
		profile_type: number;
		is_profile_broadcast_sharing_enabled: boolean;
	}

	export class Interests {
		interests: any[];
	}

	export class FanClub {
		fan_club_id: number | null;
		fan_club_name: string | null;
		is_fan_club_referral_eligible: boolean | null;
		fan_consideration_page_revamp_eligiblity: boolean | null;
		is_fan_club_gifting_eligible: boolean | null;
		subscriber_count: number | null;
		connected_member_count: number | null;
		autosave_to_exclusive_highlight: boolean | null;
		has_enough_subscribers_for_ssc: boolean | null;
	}

	export class BioLink {
		link_id: number;
		url: string;
		lynx_url: string;
		link_type: string;
		title: string;
		open_external_url_with_in_app_browser: string;
	}

	export class CreatorShoppingInfo {
		linked_merchant_accounts: any[];
	}

	export class ProfilePicture {
		url: string;
		width: number;
		height: number;
	}

	export class BiographyWithEntities {
		raw_text: string;
		entities: any[];
	}

	export class PinnedChannels {
		pinned_channel_list: any[];
		has_public_channels: boolean;
	}

	export class UserSearch extends Base {
		num_result: number;
		users: UserSearchObject[];
		has_more: boolean;
		rank_token: string;
	}

	export class UserSearchObject {
		has_anonymous_profile_picture: boolean;
		follower_count: number;
		media_count: number;
		following_count: number;
		following_tag_count: number;
		fbid_v2: string;
		has_onboarded_to_text_post_app: boolean;
		show_text_post_app_badge: boolean;
		text_post_app_joiner_number: number;
		show_ig_app_switcher_badge: boolean;
		pk: string;
		pk_id: string;
		username: string;
		full_name: string;
		is_private: boolean;
		is_verified: boolean;
		profile_pic_id: string;
		profile_pic_url: string;
		has_opt_eligible_shop: boolean;
		account_badges: any[];
		third_party_downloads_enabled: number;
		unseen_count: number;
		friendship_status: FriendshipStatus;
		latest_reel_media: number;
		should_show_category: boolean;
	}

	export class FriendshipStatus {
		following: boolean;
		followed_by: boolean;
		blocking: boolean;
		muting: boolean;
		is_private: boolean;
		incoming_request: boolean;
		outgoing_request: boolean;
		text_post_app_pre_following: boolean;
		is_bestie: boolean;
		is_restricted: boolean;
		is_feed_favorite: boolean;
		is_eligible_to_subscribe: boolean;
	}
}

type NotificationPagination = {
	max_id: string;
	pagination_first_record_timestamp: string;
}
type NotificationFilter =
	'text_post_app_replies' | 
	'text_post_app_mentions' |
	'verified';