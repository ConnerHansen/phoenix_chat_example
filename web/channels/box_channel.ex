defmodule Modeller.BoxChannel do
  use Phoenix.Channel
  require Logger

  def join("box_model:1", message, socket) do
    # Apparently this is bad practice, we should use a monitor
    # here to detect when the process dies
    Process.flag(:trap_exit, true)
    send(self, {:after_join, message})

    # I guess we're responding with OK to the socket
    {:ok, socket}
  end

  def handle_in("box_model:update_position", msg, socket) do
    Logger.debug "> update #{inspect msg}"
    broadcast! socket, "box_model:sync_position", msg

    {:noreply, socket}
  end

  def handle_in("box_model:update_content", msg, socket) do
    Logger.debug "> update #{inspect msg}"
    broadcast! socket, "box_model:sync_content", msg

    {:noreply, socket}
  end

  def handle_in("box_model:update_create", msg, socket) do
    Logger.debug "> update #{inspect msg}"
    broadcast! socket, "box_model:sync_create", msg

    {:noreply, socket}
  end

  def handle_info({:after_join, msg}, socket) do
    # broadcasts to all listeners (?) the user entered event
    # with the message of who the user is
    Logger.debug "> user entered #{inspect msg}"
    broadcast! socket, "user:entered", %{user: msg["user"]}

    # now tell the calling socket that it successfully joined
    push socket, "join", %{status: "you joined the thing!"}

    # dunno -- sockets expect a noreply? Sort of like a 200?
    {:noreply, socket}
  end

  def terminate(reason, _socket) do
    Logger.debug "> leave #{inspect reason}"
    :ok
  end
end
