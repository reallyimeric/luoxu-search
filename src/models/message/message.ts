import { Group } from "@/models/group"
import { MessageResult } from "@/clients/luoxu-client"

export class Message {
  id: number
  from_id: number
  from_name: string
  text: string
  t: number

  group: Group

  constructor(opts: {
    id: number
    from_id: number
    from_name: string
    text: string
    t: number
    group: Group
  }) {
    this.id = opts.id
    this.from_id = opts.from_id
    this.from_name = opts.from_name
    this.text = opts.text
    this.t = opts.t
    this.group = opts.group
  }

  static from_message_result_and_group(
    result: MessageResult & { group: Group }
  ): Message {
    return new Message({
      id: result.id,
      from_id: result.from_id,
      from_name: result.from_name,
      text: result.text,
      t: result.t,
      group: result.group,
    })
  }

  get time(): string {
    const t = new Date(this.t * 1000)

    const YYYY = t.getFullYear()
    const MM = t.getMonth()
    const DD = t.getDate()

    const hh = t.getHours()
    const mm = t.getMinutes()
    const ss = t.getSeconds()

    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
  }

  get link(): string {
    return `https://t.me/${this.group.pub_id}/${this.id}`
  }
}
