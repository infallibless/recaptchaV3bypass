function extractb2(string, start, end) {
    const startPos = string.indexOf(start);
    if (startPos === -1) {
        return '';
    }
    const endPos = string.indexOf(end, startPos + start.length);
    if (endPos === -1) {
        return '';
    }
    return string.substring(startPos + start.length, endPos);
}

async function gettoken() {
    const url = 'https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LeMZbsmAAAAAN5_OZdFZtB3UKcE_xGy4wSzc4u9&co=aHR0cHM6Ly9jb29yZG9ubmUuY29tOjQ0Mw..&hl=en&v=SglpK98hSCn2CroR0bKRSJl5&size=invisible&cb=3av9gsxbeqae';
    try {
        const response = await fetch(url);
        const body = await response.text();
        const token = extractb2(body, 'type="hidden" id="recaptcha-token" value="', '"');
        return token;
    } catch (error) {
        console.error(error);
    }
}

async function bypassrecaptcha() {
    const token = await gettoken();
    if (!token) {
        console.error("token could not be received");
        return;
    }
    const url = 'https://www.google.com/recaptcha/api2/reload?k=6LeMZbsmAAAAAN5_OZdFZtB3UKcE_xGy4wSzc4u9';
    const formData = new URLSearchParams();
    formData.append('v', '');
    formData.append('reason', 'q');
    formData.append('c', token);
    formData.append('k', '03AL8dmw8qW3adUjXnh5LsRW4k8TWaI2Alk_IpI0KLqAFUJ8fcSi1Tfeb6AOIkT6VrbxY8qR6jy7lBf7DYr7kMQPrf9GXrDzYimk8ALLwx1EdULAdKzShuXZ_seD5CrGs_2e6e6WFTEAiG2O3CU1mmOWkua_rXM0MFH6c7CnorLTIlZp-YfvnDMaLmPvUQBoWslfqzFUigNyP_gpWoeOq0e94jPIm2N8bZGdnUHApnIlgSEXygQAVDqcBwwFhOV9lIafJeJqAiRPtN6N_kZdbigg4KB5pMgkuRpARR_YqJ_XyYgrTdoQcJsIplja-8OYyF3lqnLbHTcW2zte_nE4nX2IjLhiLMdaK-igZzUWbu-sIglfesuey2tmimc29oHvhnKJSV_Bl-dfsgY5I6kJLMOXu629QrUMDxsEtcfWjmoEWxuwx4lE7aRxL90RiupQm7RHkWoBli1BXzpXO0RenODMvsri6S5BijN9rrRjUY5ate5JdN1WkmfGwW8mvWEwGyJ36U96RR-XXzDMqFJC8ZEYkPh1r5NkwKGTiOV7VfGZ2pKvviY4p0NWJLGeGzHAq2bPfQDtJHuKGjYt7mhP_3b_1W2cJSVf0OXxxa8OzrZRau-CFJlL5xdI7ObDv68ZKCyDsIE4n7YPwzP0Ez-0ZR76KVQ0xffRDIaQuVv1GLIz0U7AWN_zpBeDzCey_WayvlQF43kpwrrc4lzirvyW_g2yRRJkI1FrdUQX8tJKyIAaOUBUiHWYzhUNAX-xyUWQ9ucyn2bT_umUoBvIGCGUhtdfrIz0xzb0zvMlrZ1wumpszNTDeEyk5eEpW5HsLUWm_FgjnZymgcC74gRhptqG8ZO2UNUOV91MSQV7uRebnH5KEkIIG_Co8K4ailML38tDPH0JT30NylnPfF3KO-9h6tbeRL9NK9xRxeYoc3Rvg1lVzizfjKmk25JCRfaMBnYf_Y_E-fL2l9rLphYRQgvPOmXRNVnqAVQFpBrs-sSQTXiu7XQEf4LhXKdhWoOqSkpvhie7rRFnAR81AjLyUg6fWqXrNL3BxD7P17ovuIsj18DXTBops2tF7_y8WaePvLR8bYFfxJi-sOAuHjDZOnHRYbSqJjQM01uVsW0-bvIH2OrFWXZ0RMa5jnTzchsjmpxRuTfYSN5dqn3ttP1nu8lDLDKrIC-6e2Q51CCqGxv2oMjAY75kWFV6fqs1joRwq_BRhjkrSoaMXF2iFh-aoOmAGbDocknT_TJoJwUR5jswzH_UVFPlTjVLylamMl95n7nezWh21R7ZTY2AYe7P4KtIJQALh9O_UB32o5P2U8xHgpCGBd_IdY_JjqKERl0E7QfnPVB_A8nw3yfJAin4IqsvI3NQMsFw6TGx2srIq0QE_dUt3M4B3pgS5oW_cQ7wCP0NQTiJ3lfsEZ9fAjdZi7OoVrjwOE7n22BNvF2z9cbEXqmtgez7oznwEoTq319vaCJYMA7vTPI93WUkFUG1XljBhJp0kK6B4PIFilppdQ_zjZZ0NB3jSdW2so_q3rY6zPwZfHTHrjixMRCk12xccZnSMa59PGiROZBPi_0w');
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const body = await response.text();
        const bypass = extractb2(body, '["rresp","', '"');
        console.log("g-recaptcha-response -> ", bypass);
    } catch (error) {
        console.error(error);
    }
}

bypassrecaptcha();
