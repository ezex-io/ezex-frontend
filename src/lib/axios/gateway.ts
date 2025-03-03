import { CLIENT_ENV } from "@/config/env.client";
import { seconds } from "@/utils/timeUtils/timeUtils";
import axios from "axios";

const gatewayService = axios.create({
    baseURL: CLIENT_ENV.NEXT_PUBLIC_GATEWAY_API_BASE_URL,
    timeout: seconds(20),
});

export default gatewayService;
