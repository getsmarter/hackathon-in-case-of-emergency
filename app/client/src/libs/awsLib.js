import { Storage } from "aws-amplify";

export async function s3Upload(file, name) {
  const filename = name;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}