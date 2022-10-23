export default function joiErrorTranscription(error: any) {
  return error.details[0].message.replace(/[/"]/g, "");
}
