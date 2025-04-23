import { serverRedirectToDraft } from '@/utils/draftUrl'

export default async function Home() {
    return await serverRedirectToDraft('landing')
}
