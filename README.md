# Node File Uploads Server <!-- omit in toc -->

> :construction: This project is a work-in-progress. Do not use this in production systems.

A file upload server created with Node.js and Express.

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setting up your dev environment](#setting-up-your-dev-environment)
- [Usage](#usage)
  - [1. Setup verification errors](#1-setup-verification-errors)
  - [2. Generate upload tokens](#2-generate-upload-tokens)
  - [3. Try it out!](#3-try-it-out)
- [Uploader settings](#uploader-settings)
- [Endpoints](#endpoints)
  - [GET `/`](#get-)
  - [GET `/:filename`](#get-filename)
  - [GET `/actions/generate-token`](#get-actionsgenerate-token)
  - [POST `/actions/generate-token`](#post-actionsgenerate-token)
- [Security best practices](#security-best-practices)
  - [Master password](#master-password)

## Installation

> :warning: This service is only intended for development environments, and should not be used in production. The endpoints may change at any time without warning.

### Prerequisites

We will assume that you have the following:

- [Node.js v14 (LTS), v15 or v16](https://nodejs.dev/download/)
- [Yarn v1.22+ (Yarn v2/v3 enabled)](https://yarnpkg.com/getting-started/install)

### Setting up your dev environment

1. Clone the repository: `git clone https://github.com/davwheat/node-js-file-uploads-server`.
2. Ensure that Yarn v2.x.x is in use: `yarn -v`.
3. Install required NodeJS dependencies: `yarn`.
   - On some systems, you may need to globally install `ts-node`: `npm i -g ts-node`.
4. Copy the `example.env.jsonc` to `env.jsonc` and edit as needed.
5. Start the dev server: `yarn dev`.

[See the usage instructions](#usage) for more info.

## Usage

### 1. Setup verification errors

Once you've spun up your dev server, make sure that all verification steps have been completed by vising the root of your site: [http://localhost:8000](http://localhost:8000).

You should see a 404 page. If you see a verification error page, perform the required changes to clear the errors and restart the dev server as needed.

### 2. Generate upload tokens

You'll need to modify your `env.jsonc` and set a master password under `auth.password`. This password can be used to generate upload tokens remotely, which can then be used to upload media/files to your uploads server.

> :warning: Make sure you follow our recommended [security best practices](#security-best-practices) when setting your master password.

Head to the token generation page ([http://localhost:8000/actions/generate-token](http://localhost:8000/actions/generate-token)), then enter your master password and a description of the token (e.g. what device/app you will use it with). Then, press the generate button. Your token will appear in a next text field below the button.

All tokens are stored in an `auth.json` file at the root of the project. Keep this file secure.

**After you have generated the tokens you need, you should remove the master password from your `env.jsonc` file. This disables new token generation via the web.**

### 3. Try it out!

Now you have your authentication token, you can try out the uploads server! You can use your favourite file upload software, such as [ShareX](https://getsharex.com/).

Set up your uploader software with the settings listed in the [uploader settings](#uploader-settings) section, then try uploading a file.

The POST request will return a URL to the file on the server, using the `baseUrl` provided in your `env.jsonc`.

All uploaded files will be accessible via `<your url>/<filename>.<extension>`. For example, `myFile.png` can be accessed from `http://localhost:8000/myFile.png`.

## Uploader settings

These settings are all that should be needed for most uploader software. Anything missing? Open an issue.

|      Name      | Value                         | Example                                |
| :------------: | ----------------------------- | -------------------------------------- |
|   Upload URL   | Your URL + `/actions/upload`  | `http://localhost:8000/actions/upload` |
|  HTTP Method   | `POST`                        |                                        |
|  Request body  | form multipart data           |                                        |
|    Headers     | `Authorization: <YOUR TOKEN>` | `Authorization: pL1nB5gA3FsyhMqz4...`  |
| File form name | `file`                        |                                        |

## Endpoints

### GET `/`

Renders a simple root view, with a welcome message and optional attribution.

### GET `/:filename`

Fetches the file matching the provided name from the uploads folder specified in `env.jsonc`.

### GET `/actions/generate-token`

Provides a web-based interface for generating new upload tokens. Requires knowing the master password defined in `env.jsonc`.

### POST `/actions/generate-token`

Takes a master password and description, and responds with a newly generated upload token. Saves this token in `auth.json`.

```
Authorization: Password <master password>
...

Body:
{ "description": "<description>" }
```

## Security best practices

### Master password

Your master password...

- should be very long (32 chars at the very least), and consist of numbers, letters and special characters
- should be completely randomised without any memorable or personal data within it
- should be removed from your `env.jsonc` file when you do not need to generate tokens
  - _If the password field is blank (`""`), token generation is disabled._
