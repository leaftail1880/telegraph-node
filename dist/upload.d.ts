/**
 * Helps to upload local files upto 5 or 6MB (I think) to Telegraph's file
 * uploading service and returns the URL of the uploaded file.
 *
 * Useful to add local images as a source for `<img>`.
 *
 * Supported file formats: `.jpg`, `.jpeg`, `.png`, `.gif` and `.mp4`.
 *
 * ```ts
 * const imgUrl = await Telegraph.upload("./assets/images/banner.png");
 * ```
 *
 * **This is not actually a part of the official Telegraph API**, at least, it
 * does not have any official documentation.
 *
 * @param src The local or remote file path or URL.
 * @returns Remote URL to the uploaded file.
 */
export declare function upload(src: string | Blob | Uint8Array | BufferSource): Promise<string>;
