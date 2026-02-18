const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 8 * 24 * 60 * 60 * 1000 // 8 days
}

export default cookieOptions;
