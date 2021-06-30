/* eslint-disable @typescript-eslint/no-unused-vars */
import { subscribePlaylist, subscribeSingle, userPlaylist } from '@/api'
import { isLogin } from '@/helpers/index'
import { useAuthView, useAuth } from '@/hooks/index'
import { success } from '@/hooks'
import { syncToAsync } from '@/utils/index'
import { Modal } from 'ant-design-vue'
import { Song } from '@/interface'
import { ref } from 'vue'
import classnames from 'classnames'
import './subscribe.less'

export type SubscribeActionType = '1' | '2'

export const useSubscribe = (isSingle: boolean) => {
  const viewLogin = useAuthView()
  const user = useAuth()

  return async (type: SubscribeActionType, id: number) => {
    if (!isLogin()) {
      viewLogin(true)
      return false
    }
    if (isSingle) {
      const userSub = await userPlaylist(user.account.value.id)
      // const selected = await syncToAsync(resolve => {
      //   const select = ref({
      //     id: -1
      //   })
      //   const modal = Modal.confirm({
      //     title: j18n.load('src__shared__subscribe___30'),
      //     icon: '',
      //     centered: true,
      //     okText: j18n.load('src__shared__subscribe___33'),
      //     cancelText: j18n.load('src__shared__subscribe___34'),
      //     onOk: () => {
      //       resolve(select.value)
      //       modal.destroy()
      //     },
      //     content: (
      //       <ul class="optional-playlist">
      //         {userSub.map(item => (
      //           <li
      //             data-id={String(item.id)}
      //             class={classnames({
      //               'active-selected': item.id === select.value.id
      //             })}
      //             onClick={() => {
      //               select.value = item
      //               document
      //                 .querySelector('.active-selected')
      //                 ?.classList.remove('active-selected')
      //               document
      //                 .querySelector(
      //                   `.optional-playlist li[data-id="${item.id}"]`
      //                 )
      //                 ?.classList.add('active-selected')
      //             }}
      //           >
      //             {item.name}
      //           </li>
      //         ))}
      //       </ul>
      //     )
      //   })
      // })
      // console.log(selected)
      // if (selected) {
      //   await subscribeSingle(type, (selected as Song).id, [id])
      // }
      const like = userSub.find(o => o.specialType === 5)
      if (like) {
        await subscribeSingle(type, like.id, [id])
      }
    } else {
      await subscribePlaylist(type, id)
    }
    success(
      type === '1'
        ? j18n.load('src__shared__subscribe___77____3')
        : j18n.load('src__shared__subscribe___77')
    )
    return true
  }
}
