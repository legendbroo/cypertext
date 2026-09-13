# Cipher Lab — Classical Cryptography

An interactive web-based tool that demonstrates four classical cryptographic ciphers. Built as a Cryptography subject project for TYIT (Third Year Information Technology).

**Live Demo:** [https://your-username.github.io/CipherLab/](https://your-username.github.io/CipherLab/)

---

## Project Overview

Cipher Lab allows users to type any message, select a cipher, and instantly see it encrypted or decrypted. Each cipher comes with a live tool, a worked example, historical background, and a security profile — making it useful for both learning and demonstration.

---

## Ciphers Covered

| # | Cipher | Type | Key |
|---|--------|------|-----|
| 01 | Caesar Cipher | Substitution | Shift number (1–25) |
| 02 | Vigenère Cipher | Polyalphabetic Substitution | Keyword |
| 03 | Rail Fence Cipher | Transposition | Number of rails |
| 04 | Columnar Transposition | Transposition | Keyword |

---

## Features

- Live encrypt and decrypt for all four ciphers
- Visual grid and pattern display for Rail Fence and Columnar ciphers
- Historical background and worked example for each cipher
- Security profile showing key space, attack method, and modern relevance
- Copy output button
- Fully responsive — works on mobile and desktop
- No frameworks, no libraries, no installation required

---

## Technology Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and layout |
| CSS3 | Styling, responsive design, dark theme |
| Vanilla JavaScript | Cipher logic, DOM interaction |
| Google Fonts | Inter (UI) + JetBrains Mono (cipher text) |
| GitHub Pages | Free static site hosting |

---

## How to Run Locally

No setup needed. Just download the repository and open `index.html` in any browser:

```bash
git clone https://github.com/your-username/CipherLab.git
cd CipherLab
# open index.html in your browser
```

---

## Cipher Algorithms

### 1. Caesar Cipher
Every letter is shifted by a fixed number down the alphabet.
- Encrypt: `C = (P + shift) mod 26`
- Decrypt: `P = (C - shift + 26) mod 26`

### 2. Vigenère Cipher
Each letter is shifted by the corresponding letter of a repeating keyword.
- Encrypt: `C = (P + K) mod 26`
- Decrypt: `P = (C - K + 26) mod 26`
- where K is the numeric value of the keyword letter (A=0, B=1 … Z=25)

### 3. Rail Fence Cipher
Message is written in a zigzag pattern across a number of rails, then read row by row.
- Key: number of rails
- No letter substitution — only rearrangement

### 4. Columnar Transposition
Message is written row by row into a grid. Columns are read out in the alphabetical order of the keyword letters.
- Key: a keyword that determines column reading order
- Padding character X is used if the message does not fill the last row

---

## Project Structure

```
CipherLab/
│
├── index.html      # Complete website (HTML + CSS + JS in one file)
└── README.md       # Project documentation
```

---

## Team

| Name | Roll No | Contribution |
|------|---------|-------------|
| Nasreen Banu | 683 | Cipher research, algorithm implementation, UI design |

**Guide:** Dr. Manisha Landge
**Subject:** Cryptography
**Course:** TYIT — Third Year Information Technology
**College:** NCRD's Sterling College of Arts, Commerce and Science, Navi Mumbai
**Academic Year:** 2026–27

---

## Security Note

The ciphers in this project are classical techniques used for educational purposes only. They should **never** be used to protect real passwords or sensitive data. Modern cryptography uses reviewed algorithms such as AES-256 for symmetric encryption and RSA/ECC for asymmetric encryption.

---

## License

This project was built for academic purposes.
